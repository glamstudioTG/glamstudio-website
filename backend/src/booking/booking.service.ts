import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { AvailabilityService } from 'src/availability/availability.service';
import { hhmmToMinutes, minutesToHhmm } from 'src/common/utils/time.utils';
import { localDateToUtc } from 'src/common/utils/date.utils';
import { BookingStatus } from '@prisma/client';
import { canTransition } from 'src/common/constants/booking-rules';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Events } from 'src/events/events';
import { BookingWithRelations } from './types/booking-relations.types';
import { BookingResponseDto } from './dto/response-booking.dto';
import { GetWorkerBookingsDto } from './dto/get-worker-bookings.dto';
import { GetBookingsDto } from './dto/get-bookings.dto';
import { TimeService } from 'src/time/time.service';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);

  constructor(
    private prisma: PrismaService,
    private availability: AvailabilityService,
    private eventEmitter: EventEmitter2,
    private timeService: TimeService,
  ) {}

  private assertTransition(current: BookingStatus, next: BookingStatus) {
    if (!canTransition(current, next)) {
      throw new BadRequestException(
        `No se puede cambiar el estado de ${current} a ${next}`,
      );
    }
  }

  private mapBookingToResponse(
    booking: BookingWithRelations,
  ): BookingResponseDto {
    const totalPrice = booking.service.reduce(
      (acc, bs) => acc + (bs.price ?? 0),
      0,
    );

    return {
      id: booking.id,
      status: booking.status,
      date: booking.date.toISOString().slice(0, 10),
      startTime: minutesToHhmm(booking.startTime),
      endTime: minutesToHhmm(booking.endTime),
      totalDuration: booking.totalDuration,
      totalPrice,

      client: {
        name: booking.user?.name ?? booking.guestName!,
        email: booking.user?.email ?? booking.guestEmail,
      },

      worker: {
        id: booking.worker.id,
        name: booking.worker.user.name,
      },

      services: booking.service.map((bs) => ({
        id: bs.service.id,
        name: bs.service.name,
        duration: bs.duration,
        price: bs.price!,
      })),
    };
  }

  async createBooking(dto: CreateBookingDto, userId?: string) {
    const worker = await this.prisma.worker.findUnique({
      where: { id: dto.workerId },
      include: { categories: true },
    });

    if (!worker || !worker.isActive) {
      throw new BadRequestException('Trabajador no disnponible');
    }

    if (!dto.workerId) {
      throw new BadRequestException('workerId es requerido');
    }

    const services = await this.prisma.service.findMany({
      where: {
        id: { in: dto.serviceIds },
      },
    });

    if (services.length !== dto.serviceIds.length) {
      throw new NotFoundException('Uno o más servicios no existen');
    }

    const allowedCategoryIds = new Set(
      worker.categories.map((wc) => wc.categoryId),
    );

    const invalidService = services.find(
      (s) => !allowedCategoryIds.has(s.categoryId),
    );

    if (invalidService) {
      throw new BadRequestException(
        'El trabajador no ofrece uno o más de los servicios seleccionados',
      );
    }

    const hasUser = !!userId;

    const input = {
      ...dto,
      ...(hasUser && {
        name: undefined,
        email: undefined,
        phone: undefined,
      }),
    };

    const hasGuest = !!input.name && !!input.email && !!input.phone;

    if (!hasUser && !hasGuest) {
      throw new BadRequestException(
        'Debe existir un usuario autenticado o datos completos del invitado',
      );
    }

    const dateUtc = this.timeService.toUtc(input.date);
    const start = hhmmToMinutes(input.startTime);

    this.logger.debug('Time normalization', {
      inputDate: input.date,
      dateUtc,
      start,
    });

    const totalDuration = services.reduce((acc, s) => acc + s.duration, 0);

    const end = start + totalDuration;

    const endsAt = this.timeService.minutesToUtc(dateUtc, end);

    if (start >= end)
      throw new BadRequestException('Rango de reserva invalido.');

    const MAX_BOOKINGS_PER_DAY = 4;
    const bookingsCount = await this.prisma.booking.count({
      where: {
        workerId: input.workerId,
        date: dateUtc,
        status: {
          not: BookingStatus.CANCELLED,
          in: [
            BookingStatus.PENDING_PAYMENT,
            BookingStatus.PENDING_REVIEW,
            BookingStatus.CONFIRMED,
            BookingStatus.COMPLETED,
          ],
        },
      },
    });

    if (bookingsCount >= MAX_BOOKINGS_PER_DAY) {
      this.logger.warn('Daily limit reached', {
        workerId: input.workerId,
        date: dateUtc,
        count: bookingsCount,
      });

      throw new ConflictException({
        message: 'No hay más cupos disponibles para este día.',
        code: 'DAY_FULL',
      });
    }

    const slots = await this.availability.getAvailableSlots(
      input.workerId,
      dateUtc,
      totalDuration,
    );

    this.logger.debug('Slot validation', {
      requested: { start, end },
      slots,
    });

    const isValidSlot = slots?.some(
      (s) => start >= s.startMin && end <= s.endMin,
    );

    if (!isValidSlot) {
      throw new ConflictException({
        message: 'El horario seleccionado ya no está disponible.',
        code: 'INVALID_SLOT',
      });
    }

    return this.prisma.$transaction(async (tx) => {
      const latestSlots = await this.availability.getAvailableSlots(
        input.workerId,
        dateUtc,
        totalDuration,
      );

      const stillValid = latestSlots?.some(
        (s) => start >= s.startMin && end <= s.endMin,
      );

      if (!stillValid) {
        this.logger.warn('Slot lost during transaction', {
          workerId: input.workerId,
          start,
          end,
        });

        throw new ConflictException({
          message: 'El horario acaba de ser ocupado. Intenta con otro.',
          code: 'RACE_CONDITION_SLOT',
        });
      }

      const booking = await tx.booking.create({
        data: {
          date: dateUtc,
          startTime: start,
          endTime: end,
          endsAt,
          totalDuration,
          status: BookingStatus.PENDING_PAYMENT,
          comment: input.comment,
          worker: {
            connect: { id: input.workerId },
          },
          ...(hasUser
            ? { user: { connect: { id: userId } } }
            : {
                guestName: input.name,
                guestEmail: input.email,
                guestPhone: input.phone,
              }),
        },
        include: {
          worker: { include: { user: true } },
          service: { include: { service: true } },
          user: true,
        },
      });

      await tx.bookingService.createMany({
        data: services.map((s) => ({
          bookingId: booking.id,
          serviceId: s.id,
          duration: s.duration,
          price: s.price,
        })),
      });

      this.eventEmitter.emit(Events.BOOKING_CREATED, {
        bookingId: booking.id,
      });

      const totalPrice = services.reduce((acc, s) => acc + s.price, 0);

      return {
        id: booking.id,
        status: booking.status,
        date: input.date,
        startTime: input.startTime,
        endTime: minutesToHhmm(booking.endTime),
        totalDuration: booking.totalDuration,
        totalPrice,

        client: {
          name: booking.user?.name ?? booking.guestName!,
          email: booking.user?.email ?? booking.guestEmail,
        },

        worker: {
          id: booking.worker.id,
          name: booking.worker.user.name,
        },

        services: services.map((s) => ({
          id: s.id,
          name: s.name,
          duration: s.duration,
          price: s.price,
        })),
      };
    });
  }

  async cancelBooking(id: string, userId?: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException('Reserva no encontrada.');
    }

    this.assertTransition(booking.status, BookingStatus.CANCELLED);

    const bookingDateTime = this.timeService.minutesToUtc(
      booking.date,
      booking.startTime,
    );

    const now = new Date();
    const diffMs = bookingDateTime.getTime() - now.getTime();
    const diffMinutes = diffMs / (1000 * 60);

    if (diffMinutes <= 0) {
      throw new BadRequestException('No se pueden cancelar reservas pasadas.');
    }

    if (diffMinutes <= 30) {
      throw new BadRequestException(
        'No se puede cancelar la reserva con menos de 30 minutos de anticipación.',
      );
    }

    if (booking.userId) {
      if (!userId || booking.userId !== userId) {
        throw new ForbiddenException(
          'No tienes permiso para cancelar esta reserva.',
        );
      }
    }

    return this.prisma.booking.update({
      where: { id },
      data: {
        status: BookingStatus.CANCELLED,
      },
    });
  }

  async confirmBooking(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException('Reserva no encontrada.');
    }

    this.assertTransition(booking.status, BookingStatus.CONFIRMED);

    return this.prisma.booking.update({
      where: { id },
      data: { status: BookingStatus.CONFIRMED },
    });
  }

  async completeBooking(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException('Reserva no encontrada.');
    }

    this.assertTransition(booking.status, BookingStatus.COMPLETED);

    return this.prisma.booking.update({
      where: { id },
      data: { status: BookingStatus.COMPLETED },
    });
  }

  async getByDate(date: string): Promise<BookingResponseDto[]> {
    const dateUtc = this.timeService.toUtc(date);
    const { startUtc, endUtc } = this.timeService.getDayBounds(dateUtc);

    const bookings = await this.prisma.booking.findMany({
      where: {
        date: {
          gte: startUtc,
          lte: endUtc,
        },
      },
      orderBy: { startTime: 'asc' },
      include: {
        worker: { include: { user: true } },
        service: { include: { service: true } },
        user: true,
      },
    });

    return bookings.map((b) => this.mapBookingToResponse(b));
  }

  async getAll(filters: GetBookingsDto): Promise<BookingResponseDto[]> {
    const { view = 'day', date } = filters;

    const baseUtc = this.timeService.toUtc(date ?? new Date());

    let startUtc: Date;
    let endUtc: Date;

    switch (view) {
      case 'day': {
        const bounds = this.timeService.getDayBounds(baseUtc);
        startUtc = bounds.startUtc;
        endUtc = bounds.endUtc;
        break;
      }

      case 'week': {
        endUtc = baseUtc;
        startUtc = new Date(endUtc.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      }

      case 'month': {
        endUtc = baseUtc;
        startUtc = new Date(endUtc.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      }

      default: {
        const bounds = this.timeService.getDayBounds(baseUtc);
        startUtc = bounds.startUtc;
        endUtc = bounds.endUtc;
      }
    }

    const bookings = await this.prisma.booking.findMany({
      where: {
        date: {
          gte: startUtc,
          lte: endUtc,
        },
      },
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
      include: {
        worker: { include: { user: true } },
        service: { include: { service: true } },
        user: true,
      },
    });

    return bookings.map((b) => this.mapBookingToResponse(b));
  }

  async getByWorker(
    workerId: string,
    filters: GetWorkerBookingsDto,
  ): Promise<BookingResponseDto[]> {
    const where: any = {
      workerId,
    };

    if (filters.status) {
      where.status = filters.status;
    }

    if (filters.from && filters.to) {
      const fromUtc = this.timeService.toUtc(filters.from);
      const toUtc = this.timeService.toUtc(filters.to);

      where.date = {
        gte: fromUtc,
        lte: toUtc,
      };
    }

    if (filters.period) {
      const nowUtc = new Date();

      let fromUtc: Date;

      switch (filters.period) {
        case 'day': {
          const { startUtc } = this.timeService.getDayBounds(nowUtc);
          fromUtc = startUtc;
          break;
        }

        case 'week': {
          fromUtc = new Date(nowUtc.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        }

        case 'month': {
          fromUtc = new Date(nowUtc.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        }
      }

      where.date = { gte: fromUtc };
    }

    if (filters.search) {
      where.OR = [
        { user: { name: { contains: filters.search, mode: 'insensitive' } } },
        { guestName: { contains: filters.search, mode: 'insensitive' } },
      ];
    }

    const bookings = await this.prisma.booking.findMany({
      where,
      include: {
        worker: { include: { user: true } },
        service: { include: { service: true } },
        user: true,
        transactionProofs: {
          orderBy: { uploadedAt: 'desc' },
          take: 1,
        },
      },
      orderBy: {
        date: filters.order === 'oldest' ? 'asc' : 'desc',
      },
    });

    return bookings.map((b) => ({
      ...this.mapBookingToResponse(b),
      transactionProof: b.transactionProofs[0]
        ? {
            id: b.transactionProofs[0].id,
            imageUrl: b.transactionProofs[0].imageUrl,
            status: b.transactionProofs[0].status,
          }
        : null,
    }));
  }
}
