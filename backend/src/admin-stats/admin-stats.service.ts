import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookingStatus } from '@prisma/client';
import { localDateToUtc } from 'src/common/utils/date.utils';

@Injectable()
export class AdminStatsService {
  constructor(private prisma: PrismaService) {}

  async countActiveWorkers() {
    return this.prisma.worker.count({
      where: { isActive: true },
    });
  }

  async countPendingReview() {
    return this.prisma.booking.count({
      where: { status: BookingStatus.PENDING_REVIEW },
    });
  }

  async countToday() {
    const today = localDateToUtc(new Date().toISOString().slice(0, 10));

    return this.prisma.booking.count({
      where: {
        date: today,
        status: { not: BookingStatus.CANCELLED },
      },
    });
  }

  async getMonthlyIncome() {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const result = await this.prisma.bookingService.aggregate({
      where: {
        booking: {
          status: {
            in: [BookingStatus.COMPLETED],
          },
          date: { gte: startOfMonth },
        },
      },
      _sum: { price: true },
    });

    return result._sum.price ?? 0;
  }

  async countTotalServices() {
    return this.prisma.service.count();
  }

  async countTotalCategories() {
    return this.prisma.category.count();
  }

  async getServiceStats() {
    const [totalServices, totalCategories] = await Promise.all([
      this.countTotalServices(),
      this.countTotalCategories(),
    ]);

    return {
      totalServices,
      totalCategories,
    };
  }

  async getStats() {
    const [todayBookings, pendingReviews, monthlyIncome, activeWorkers] =
      await Promise.all([
        this.countToday(),
        this.countPendingReview(),
        this.getMonthlyIncome(),
        this.countActiveWorkers(),
      ]);

    return {
      todayBookings,
      pendingReviews,
      monthlyIncome,
      activeWorkers,
    };
  }
}
