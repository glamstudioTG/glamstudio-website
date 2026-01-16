import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { AvailabilityService } from 'src/availability/availability.service';
import { hhmmToMinutes } from 'src/common/utils/time.utils';
import { localDateToUtc } from 'src/common/utils/date.utils';
import { BookingStatus, Prisma } from '@prisma/client';
import { canTransition } from 'src/common/constants/booking-rules';

@Injectable()
export class BookingService {
  constructor(
    private prisma: PrismaService,
    private availability: AvailabilityService,
  ) {}

  private assertTransition(current: BookingStatus, next: BookingStatus) {
    if (!canTransition(current, next)) {
      throw new BadRequestException(
        `No se puede cambiar el estado de ${current} a ${next}`,
      );
    }
  }

  async createBooking(dto: CreateBookingDto, userId?: string) {
    const worker = await this.prisma.worker.findUnique({
      where: { id: dto.workerId },
      include: { categories: true },
    });

    if (!worker || !worker.isActive) {
      throw new BadRequestException('Trabajador no disnponible');
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
    const hasGuest = !!dto.name && !!dto.email && !!dto.phone;

    if (!hasUser && !hasGuest) {
      throw new BadRequestException(
        'Debe existir un usuario autenticado o datos completos del invitado',
      );
    }

    if (hasUser && hasGuest) {
      throw new BadRequestException(
        'No se puede crear una reserva con usuario y datos de invitado al mismo tiempo',
      );
    }

    const dateUtc = localDateToUtc(dto.date);
    const start = hhmmToMinutes(dto.startTime);

    const totalDuration = services.reduce((acc, s) => acc + s.duration, 0);

    const end = start + totalDuration;

    if (start >= end)
      throw new BadRequestException('Rango de reserva invalido.');

    const MAX_BOOKINGS_PER_DAY = 4;
    const bookingsCount = await this.prisma.booking.count({
      where: {
        workerId: dto.workerId,
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
      throw new ConflictException(
        'No hay más cupos disponibles para este día.',
      );
    }

    const slots = await this.availability.getAvailableSlots(
      dto.workerId,
      dto.date,
      totalDuration,
    );

    const isValidSlot = slots?.some(
      (s) => s.startMin === start && s.endMin === end,
    );

    if (!isValidSlot) {
      throw new ConflictException('Selecciona cupo valido.');
    }

    return this.prisma.$transaction(async (tx) => {
      const booking = await tx.booking.create({
        data: {
          date: dateUtc,
          startTime: start,
          endTime: end,
          totalDuration,
          status: BookingStatus.PENDING_PAYMENT,
          comment: dto.comment,
          worker: {
            connect: { id: dto.workerId },
          },
          ...(hasUser
            ? { user: { connect: { id: userId } } }
            : {
                guestName: dto.name,
                guestEmail: dto.email,
                guestPhone: dto.phone,
              }),
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

      return booking;
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

    const bookingDateTime = new Date(booking.date);
    bookingDateTime.setMinutes(
      bookingDateTime.getMinutes() + booking.startTime,
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

  async getByDate(date: string) {
    const d = localDateToUtc(date);
    return this.prisma.booking.findMany({
      where: { date: d },
      orderBy: { startTime: 'asc' },
    });
  }

  async getAll() {
    return this.prisma.booking.findMany({
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
    });
  }
}
