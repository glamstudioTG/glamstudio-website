import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron } from '@nestjs/schedule';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class BookingCompletionService {
  private readonly logger = new Logger(BookingCompletionService.name);
  constructor(private prisma: PrismaService) {}

  @Cron('15 3 * * *')
  async completePastBookings() {
    try {
      const now = new Date();

      const result = await this.prisma.booking.updateMany({
        where: {
          status: BookingStatus.CONFIRMED,
          endsAt: { lt: now },
        },
        data: {
          status: BookingStatus.COMPLETED,
        },
      });

      if (result.count > 0) {
        this.logger.log(`Marked ${result.count} bookings as COMPLETED.`);
      }
    } catch (error) {
      this.logger.error('Error completing past bookings', error);
    }
  }
}
