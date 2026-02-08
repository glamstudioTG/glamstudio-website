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
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { TransactionProofFiltersDto } from './dto/transaction-proof-filters.dto';
import { Prisma } from '@prisma/client';
import { TransactionProofQueryDto } from './dto/transaction-proof-query.dto';

type TransactionProofWithRelations = Prisma.TransactionProofGetPayload<{
  include: {
    booking: {
      include: {
        user: true;
        worker: { include: { user: true } };
        service: { include: { service: true } };
      };
    };
  };
}>;

@Injectable()
export class TransactionProofService {
  constructor(
    private prisma: PrismaService,
    private availability: AvailabilityService,
    private eventEmitter: EventEmitter2,
  ) {}

  private buildPeriodFilter(period?: 'day' | 'week' | 'month') {
    if (!period) return undefined;

    const now = new Date();
    let from: Date;

    switch (period) {
      case 'day':
        from = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'week':
        from = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        from = new Date(now.setMonth(now.getMonth() - 1));
        break;
    }

    return { gte: from };
  }

  private mapToCard(proof: TransactionProofWithRelations) {
    const booking = proof.booking;

    return {
      proof: {
        id: proof.id,
        imageUrl: proof.imageUrl,
        status: proof.status,
      },
      booking: {
        id: booking.id,
        date: booking.date.toISOString().slice(0, 10),
        startTime: booking.startTime,
        status: booking.status,
      },
      client: {
        name: booking.user?.name ?? booking.guestName!,
        email: booking.user?.email ?? booking.guestEmail!,
      },
      worker: {
        id: booking.worker.id,
        name: booking.worker.user.name,
      },
      services: booking.service.map((bs) => ({
        name: bs.service.name,
        price: bs.service.price,
      })),
    };
  }

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

      this.eventEmitter.emit(Events.BOOKING_PROOF_UPLOADED, {
        bookingId: booking.id,
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

  async getPending(workerId: string, query: TransactionProofQueryDto) {
    const currentPage = query.page ?? 1;
    const currentLimit = query.limit ?? 10;
    const skip = (currentPage - 1) * currentLimit;

    const bookingWhere: Prisma.BookingWhereInput = {
      status: BookingStatus.PENDING_REVIEW,
      workerId: workerId,
      date: this.buildPeriodFilter(query.period),
    };

    if (query.search) {
      bookingWhere.OR = [
        {
          user: {
            name: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        },
        {
          service: {
            some: {
              service: {
                name: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
            },
          },
        },
      ];
    }

    const where: Prisma.TransactionProofWhereInput = {
      status: TransactionStatus.PENDING,
      booking: bookingWhere,
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.transactionProof.findMany({
        where,
        include: {
          booking: {
            include: {
              user: true,
              worker: { include: { user: true } },
              service: { include: { service: true } },
            },
          },
        },
        orderBy: { uploadedAt: 'asc' },
        skip,
        take: currentLimit,
      }),
      this.prisma.transactionProof.count({ where }),
    ]);

    return {
      data: items.map((item) => this.mapToCard(item)),
      meta: {
        page: currentPage,
        limit: currentLimit,
        total,
        totalPages: Math.ceil(total / currentLimit),
      },
    };
  }

  async getHistory(workerId: string, query: TransactionProofQueryDto) {
    const currentPage = query.page ?? 1;
    const currentLimit = query.limit ?? 10;
    const skip = (currentPage - 1) * currentLimit;

    const bookingWhere: Prisma.BookingWhereInput = {
      workerId,
      date: this.buildPeriodFilter(query.period),
    };

    if (query.status) {
      bookingWhere.status = query.status;
    }

    if (query.search) {
      bookingWhere.OR = [
        {
          user: {
            name: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        },
        {
          service: {
            some: {
              service: {
                name: {
                  contains: query.search,
                  mode: 'insensitive',
                },
              },
            },
          },
        },
      ];
    }

    const where: Prisma.TransactionProofWhereInput = {
      booking: bookingWhere,
    };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.transactionProof.findMany({
        where,
        include: {
          booking: {
            include: {
              user: true,
              worker: { include: { user: true } },
              service: { include: { service: true } },
            },
          },
        },
        orderBy: { uploadedAt: 'desc' },
        skip,
        take: currentLimit,
      }),
      this.prisma.transactionProof.count({ where }),
    ]);

    return {
      data: items.map((item) => this.mapToCard(item)),
      meta: {
        page: currentPage,
        limit: currentLimit,
        total,
        totalPages: Math.ceil(total / currentLimit),
      },
    };
  }
}
