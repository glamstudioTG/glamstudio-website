import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron } from '@nestjs/schedule';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class BookingCleanupService {
  private readonly logger = new Logger(BookingCleanupService.name);

  constructor(private prisma: PrismaService) {}

  @Cron('40 3 * * *')
  async cleanupOldBookings() {
    try {
      const DAYS_TO_KEEP = 30;
      const limitDate = new Date(
        Date.now() - DAYS_TO_KEEP * 24 * 60 * 60 * 1000,
      );

      const deletedProofs = await this.prisma.transactionProof.deleteMany({
        where: {
          booking: {
            status: { in: [BookingStatus.COMPLETED, BookingStatus.CANCELLED] },
            updatedAt: { lt: limitDate },
          },
        },
      });

      const deletedServices = await this.prisma.bookingService.deleteMany({
        where: {
          booking: {
            status: { in: [BookingStatus.COMPLETED, BookingStatus.CANCELLED] },
            updatedAt: { lt: limitDate },
          },
        },
      });

      const deletedBookings = await this.prisma.booking.deleteMany({
        where: {
          status: { in: [BookingStatus.COMPLETED, BookingStatus.CANCELLED] },
          updatedAt: { lt: limitDate },
        },
      });

      if (deletedBookings.count > 0) {
        this.logger.log(
          `Cleanup completed. Deleted ${deletedBookings.count} bookings.`,
        );
      }
    } catch (error) {
      this.logger.error('Error cleaning old bookings', error);
    }
  }
}
