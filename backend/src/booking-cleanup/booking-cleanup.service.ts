import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron } from '@nestjs/schedule';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class BookingCleanupService {
  private readonly logger = new Logger(BookingCleanupService.name);
  constructor(private prisma: PrismaService) {}

  @Cron('0 3 * * *')
  async cleanupOldBookings() {
    const DAYS_TO_KEEP = 30;
    const limitDate = new Date(Date.now() - DAYS_TO_KEEP * 24 * 60 * 60 * 1000);

    const BookingToDelete = await this.prisma.booking.findMany({
      where: {
        status: { in: [BookingStatus.COMPLETED, BookingStatus.CANCELLED] },
        updatedAt: { lt: limitDate },
      },
      select: { id: true },
    });

    if (BookingToDelete.length === 0) {
      return;
    }

    const bookingsIds = BookingToDelete.map((b) => b.id);

    await this.prisma.$transaction(async (tx) => {
      await tx.transactionProof.deleteMany({
        where: { bookingId: { in: bookingsIds } },
      });

      await tx.bookingService.deleteMany({
        where: { bookingId: { in: bookingsIds } },
      });

      await tx.booking.deleteMany({
        where: { id: { in: bookingsIds } },
      });
    });

    this.logger.log(`Eliminadas ${bookingsIds.length} reservas antiguas`);
  }
}
