import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron } from '@nestjs/schedule';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class BookingExpirationService {
  private readonly logger = new Logger(BookingExpirationService.name);

  constructor(private prisma: PrismaService) {}

  @Cron('*/5 * * * *')
  async expirePendingPayments() {
    const TTL_MINUTES = 30;
    const expirationTime = new Date(Date.now() - TTL_MINUTES * 60 * 1000);

    const expiredBookings = await this.prisma.booking.findMany({
      where: {
        status: BookingStatus.PENDING_PAYMENT,
        createdAt: { lt: expirationTime },
      },
      select: { id: true },
    });

    if (expiredBookings.length === 0) {
      return;
    }

    await this.prisma.booking.updateMany({
      where: {
        id: { in: expiredBookings.map((b) => b.id) },
      },
      data: { status: BookingStatus.CANCELLED },
    });

    this.logger.log(
      `Expired ${expiredBookings.length} bookings due to non-payment.`,
    );
  }
}
