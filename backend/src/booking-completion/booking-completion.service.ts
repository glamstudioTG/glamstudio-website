import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Cron } from '@nestjs/schedule';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class BookingCompletionService {
  private readonly logger = new Logger(BookingCompletionService.name);
  constructor(private prisma: PrismaService) {}

  @Cron('0 3 * * *')
  async completePastBookings() {
    const now = new Date();

    const confirmedBookings = await this.prisma.booking.findMany({
      where: {
        status: BookingStatus.CONFIRMED,
      },
      select: { id: true, endTime: true, date: true },
    });
    const bookingsToComplete = confirmedBookings.filter((b) => {
      const bookingEnd = new Date(b.date);
      bookingEnd.setMinutes(bookingEnd.getMinutes() + b.endTime);
      return bookingEnd < now;
    });

    if (bookingsToComplete.length === 0) {
      return;
    }

    await this.prisma.booking.updateMany({
      where: {
        id: { in: bookingsToComplete.map((b) => b.id) },
      },
      data: { status: BookingStatus.COMPLETED },
    });

    this.logger.log(
      `Marcadas como COMPLETED ${bookingsToComplete.length} reservas`,
    );
  }
}
