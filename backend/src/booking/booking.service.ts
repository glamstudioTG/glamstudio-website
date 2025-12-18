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
  constructor(private prisma: PrismaService, private availability: AvailabilityService) {}

  private assertTransition(
    current: BookingStatus,
    next: BookingStatus,
  ) {
    if (!canTransition(current, next)) {
      throw new BadRequestException(
        `No se puede cambiar el estado de ${current} a ${next}`,
      );
    }
  }

  async createBooking(dto: CreateBookingDto, userId?: string) {

    const service = await this.prisma.service.findUnique({
      where: {id: dto.serviceId}
    })

    if (!service) throw new NotFoundException('Service not found');

    const hasUser = !!userId;
    const hasGuest =
      !!dto.name && !!dto.email && !!dto.phone;

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

    const dateUtc = localDateToUtc(dto.date)
    const start = hhmmToMinutes(dto.startTime)
    const end = start + service.duration

    if (start >= end) throw new BadRequestException('Rango de reserva invalido.')

    const MAX_BOOKINGS_PER_DAY = 4;
    const bookingsCount = await this.prisma.booking.count({
      where: {
        date: dateUtc,
        status: {
          not: BookingStatus.CANCELLED,
          in: [BookingStatus.PENDING, BookingStatus.CONFIRMED, BookingStatus.COMPLETED],
        }
      }
    })

    if (bookingsCount >= MAX_BOOKINGS_PER_DAY) {
  throw new ConflictException(
    'No hay más cupos disponibles para este día.',
  );
}



    const slots = await this.availability.getAvailableSlots(dto.date, service.duration)

    const isValidSlot = slots?.some(
      s => s.startMin === start && s.endMin === end,
    );

    if(!isValidSlot) {
      throw new ConflictException('Selecciona cupo valido.')
    }

    const data: Prisma.BookingCreateInput= {
      date: dateUtc,
      startTime: start,
      endTime: end,
      status: BookingStatus.PENDING,
      comment: dto.comment,
      service: {
        connect: { id: dto.serviceId },
      },
    };

    if (hasUser) {
      data.user = {
        connect: { id: userId },
      };
    } else {
      data.guestName = dto.name;
      data.guestEmail = dto.email;
      data.guestPhone = dto.phone;
    }

    return this.prisma.booking.create({data})
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
    throw new BadRequestException(
      'No se pueden cancelar reservas pasadas.',
    );
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

    this.assertTransition(
      booking.status,
      BookingStatus.CONFIRMED,
    );

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

    this.assertTransition(
      booking.status,
      BookingStatus.COMPLETED,
    );

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
