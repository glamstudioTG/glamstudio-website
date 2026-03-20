import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { minutesToHhmm } from 'src/common/utils/time.utils';
import { substractRanges } from 'src/common/utils/substractRanges';
import { BookingStatus } from '@prisma/client';
import { TimeService } from 'src/time/time.service';
import { mapNumberToDayEnum } from 'src/common/utils/mapNumberToDayEnum';

@Injectable()
export class AvailabilityService {
  private readonly logger = new Logger(AvailabilityService.name);

  constructor(
    private prisma: PrismaService,
    private timeService: TimeService,
  ) {}

  async getAvailableSlots(
    workerId: string,
    dateStr: Date,
    totalDuration: number,
    slotInterval?: number,
  ) {
    const dateUtc = this.timeService.toUtc(dateStr);

    const { startUtc, endUtc } = this.timeService.getDayBounds(dateUtc);

    const dayOfWeekNumber = this.timeService.getDayOfWeek(dateUtc);
    const dayOfWeek = mapNumberToDayEnum(dayOfWeekNumber);

    this.logger.debug('DAY CHECK', {
      original: dateStr,
      utc: dateUtc,
      dayOfWeekNumber,
    });

    const globalBlocks = await this.prisma.scheduleBlock.findMany({
      where: {
        workerId: null,
        date: {
          gte: startUtc,
          lte: endUtc,
        },
      },
    });

    const workerBlocks = await this.prisma.scheduleBlock.findMany({
      where: {
        workerId,
        date: {
          gte: startUtc,
          lte: endUtc,
        },
      },
    });

    const allBlocks = [...globalBlocks, ...workerBlocks];

    const hasFullDayBlock = allBlocks.some(
      (b) => b.startTime == null && b.endTime == null,
    );

    if (hasFullDayBlock) return [];

    const overrides = await this.prisma.overrideHours.findFirst({
      where: {
        workerId,
        date: {
          gte: startUtc,
          lte: endUtc,
        },
      },
    });

    let baseRanges: Array<[number, number]> = [];

    if (overrides) {
      baseRanges = [[overrides.startTime, overrides.endTime]];
    } else {
      const businessHours = await this.prisma.businessHours.findMany({
        where: {
          workerId,
          day: dayOfWeek,
        },
        orderBy: { startTime: 'asc' },
      });

      if (businessHours.length === 0) {
        this.logger.warn('Worker without business hours', {
          workerId,
          dayOfWeek,
        });
        return [];
      }

      baseRanges = businessHours.map((b): [number, number] => [
        b.startTime,
        b.endTime,
      ]);
    }

    const blockRanges: Array<[number, number]> = [];

    for (const b of allBlocks) {
      if (b.startTime != null && b.endTime != null) {
        blockRanges.push([b.startTime, b.endTime]);
      }
    }

    const bookings = await this.prisma.booking.findMany({
      where: {
        workerId,
        date: {
          gte: startUtc,
          lte: endUtc,
        },
        status: {
          in: [
            BookingStatus.PENDING_REVIEW,
            BookingStatus.CONFIRMED,
            BookingStatus.COMPLETED,
          ],
        },
      },
      select: { startTime: true, endTime: true },
    });

    for (const bk of bookings) {
      blockRanges.push([bk.startTime, bk.endTime]);
    }

    blockRanges.sort((a, b) => a[0] - b[0]);

    let freeRanges: Array<[number, number]> = [];

    for (const [s, e] of baseRanges) {
      freeRanges.push(...substractRanges(s, e, blockRanges));
    }

    const now = new Date();
    const isToday =
      dateUtc.getFullYear() === now.getFullYear() &&
      dateUtc.getMonth() === now.getMonth() &&
      dateUtc.getDate() === now.getDate();

    if (isToday) {
      const nowMinutes = now.getHours() * 60 + now.getMinutes();

      freeRanges = freeRanges
        .map(([s, e]) => [Math.max(s, nowMinutes), e] as [number, number])
        .filter(([s, e]) => e - s >= totalDuration);
    }

    const interval = slotInterval ?? totalDuration;

    const slots: Array<{
      startMin: number;
      endMin: number;
      start: string;
      end: string;
    }> = [];

    for (const [fs, fe] of freeRanges) {
      let cursor = fs;

      while (cursor + totalDuration <= fe) {
        slots.push({
          startMin: cursor,
          endMin: cursor + totalDuration,
          start: minutesToHhmm(cursor),
          end: minutesToHhmm(cursor + totalDuration),
        });

        cursor += interval;
      }
    }

    const uniqueSlots = Array.from(
      new Map(slots.map((s) => [`${s.startMin}-${s.endMin}`, s])).values(),
    );

    this.logger.debug('Availability result', {
      baseRanges,
      blockRanges,
      freeRanges,
      slots: uniqueSlots.length,
    });

    return uniqueSlots;
  }
}
