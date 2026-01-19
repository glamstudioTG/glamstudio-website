import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Events } from 'src/events/events';
import { PrismaService } from 'src/prisma/prisma.service';
import { AvailabilityService } from 'src/availability/availability.service';
import { BookingStatus, TransactionStatus } from '@prisma/client';

@Injectable()
export class TransactionProofService {
  constructor(
    private prisma: PrismaService,
    private availability: AvailabilityService,
    private eventEmitter: EventEmitter2,
  ) {}

  async uploadProof(bookingId: string, imageUrl: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      throw new NotFoundException('Reserva no encontrada');
    }

    if (booking.status !== BookingStatus.PENDING_PAYMENT) {
      throw new BadRequestException(
        'No se pueden subir comprobante para este estado',
      );
    }

    const slots = await this.availability.getAvailableSlots(
      booking.workerId,
      booking.date.toISOString().split('T')[0],
      booking.totalDuration,
    );

    const stillAvailable = slots.some(
      (s) => s.startMin === booking.startTime && s.endMin === booking.endTime,
    );

    if (!stillAvailable) {
      throw new ConflictException(
        'El horario ya no está disponible, selecciona otro',
      );
    }

    const existingProof = await this.prisma.transactionProof.findFirst({
      where: {
        bookingId: booking.id,
        status: TransactionStatus.PENDING,
      },
    });

    if (existingProof) {
      throw new BadRequestException(
        'Ya existe un comprobante en revisión para esta reserva',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.transactionProof.create({
        data: {
          imageUrl,
          status: TransactionStatus.PENDING,
          booking: { connect: { id: booking.id } },
        },
      });

      await tx.booking.update({
        where: { id: booking.id },
        data: { status: BookingStatus.PENDING_REVIEW },
      });

      return { success: true };
    });
  }

  async reviewProof(
    proofId: string,
    status: TransactionStatus,
    reviewerId: string,
  ) {
    const proof = await this.prisma.transactionProof.findUnique({
      where: { id: proofId },
      include: { booking: true },
    });

    if (!proof) {
      throw new NotFoundException('comprobante no encontrado');
    }

    if (proof.status !== TransactionStatus.PENDING) {
      throw new BadRequestException('Este comprobante ya fue revisado');
    }

    const bookingNextStatus =
      status === TransactionStatus.APPROVED
        ? BookingStatus.CONFIRMED
        : BookingStatus.CANCELLED;

    return this.prisma.$transaction(async (tx) => {
      await tx.transactionProof.update({
        where: { id: proof.id },
        data: { status, reviewedAt: new Date(), reviewedBy: reviewerId },
      });

      await tx.booking.update({
        where: { id: proof.bookingId },
        data: { status: bookingNextStatus },
      });

      if (status === TransactionStatus.APPROVED) {
        this.eventEmitter.emit(Events.TRANSACTION_APPROVED, {
          bookingId: proof?.bookingId,
        });
      } else {
        this.eventEmitter.emit(Events.TRANSACTION_REJECTED, {
          bookingId: proof?.bookingId,
        });
      }

      return { success: true };
    });
  }

  async getInfoTransactionProof(proofId: string) {
    const proof = await this.prisma.transactionProof.findUnique({
      where: { id: proofId },
      include: {
        booking: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                phone: true,
              },
            },
            service: {
              include: {
                service: {
                  select: {
                    name: true,
                    duration: true,
                    price: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!proof) {
      throw new NotFoundException('comprobante no encontrado');
    }

    const booking = proof.booking;

    return {
      proof: {
        id: proof.id,
        imageUrl: proof.imageUrl,
        status: proof.status,
        uploadedAt: proof.uploadedAt,
        reviewedAt: proof.reviewedAt,
      },
      booking: {
        id: booking.id,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
        status: booking.status,
      },
      client: booking.user
        ? {
            type: 'USER',
            name: booking.user.name,
            email: booking.user.email,
            phone: booking.user.phone,
          }
        : {
            type: 'GUEST',
            name: booking.guestName,
            email: booking.guestEmail,
            phone: booking.guestPhone,
          },
      service: booking.service.map((bs) => ({
        name: bs.service.name,
        duration: bs.service.duration,
        price: bs.service.price,
      })),
    };
  }
}
