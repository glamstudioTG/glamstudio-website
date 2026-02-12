import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron } from '@nestjs/schedule';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class BookingExpirationService {
  private readonly logger = new Logger(BookingExpirationService.name);

  constructor(private prisma: PrismaService) {}

  @Cron('*/10 * * * *')
  async expirePendingPayments() {
    try {
      const TTL_MINUTES = 30;
      const expirationTime = new Date(Date.now() - TTL_MINUTES * 60 * 1000);

      const result = await this.prisma.booking.updateMany({
        where: {
          status: BookingStatus.PENDING_PAYMENT,
          createdAt: { lt: expirationTime },
        },
        data: {
          status: BookingStatus.CANCELLED,
        },
      });

      if (result.count > 0) {
        this.logger.log(`Expired ${result.count} bookings due to non-payment.`);
      }
    } catch (error) {
      this.logger.error('Error expiring pending bookings', error);
    }
  }
}
