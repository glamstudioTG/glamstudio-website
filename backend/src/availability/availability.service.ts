import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { minutesToHhmm } from 'src/common/utils/time.utils';
import { substractRanges } from 'src/common/utils/substractRanges';
import { localDateToUtc } from 'src/common/utils/date.utils';
import { getDayOfWeekEnum } from 'src/common/utils/day-of-week';
import { BookingStatus } from '@prisma/client';

@Injectable()
export class AvailabilityService {
  constructor(private prisma: PrismaService) {}

  async getAvailableSlots(
    workerId: string,
    dateStr: string,
    totalDuration: number,
    slotInterval?: number,
  ) {
    const dateUtc = localDateToUtc(dateStr);
    const dayOfWeek = getDayOfWeekEnum(dateUtc);

    const GlobalBlocks = await this.prisma.scheduleBlock.findMany({
      where: { workerId: null, date: dateUtc },
    });

    const workerBlocks = await this.prisma.scheduleBlock.findMany({
      where: { workerId, date: dateUtc },
    });

    const allBlocks = [...GlobalBlocks, ...workerBlocks];

    const hasFullDayBlock = allBlocks.some(
      (b) => b.startTime == null && b.endTime == null,
    );

    if (hasFullDayBlock) {
      return [];
    }

    const overrides = await this.prisma.overrideHours.findFirst({
      where: { workerId, date: dateUtc },
    });

    let baseRanges: Array<[number, number]> = [];

    baseRanges = Array.from(
      new Map(baseRanges.map(([s, e]) => [`${s}-${e}`, [s, e]])).values(),
    ) as Array<[number, number]>;

    if (overrides) {
      baseRanges = [[overrides.startTime, overrides.endTime]];
    } else {
      const businessHours = await this.prisma.businessHours.findMany({
        where: { workerId, day: dayOfWeek },
        orderBy: { startTime: 'asc' },
      });

      baseRanges = businessHours.map((b) => [b.startTime, b.endTime]);
    }

    if (baseRanges.length === 0) return [];

    const blockRanges: Array<[number, number]> = [];

    for (const b of [...GlobalBlocks, ...workerBlocks]) {
      if (b.startTime != null && b.endTime != null) {
        blockRanges.push([b.startTime, b.endTime]);
      }
    }

    const bookings = await this.prisma.booking.findMany({
      where: {
        workerId,
        date: dateUtc,
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
    const isToday = dateUtc.toDateString() === now.toDateString();

    let nowMinutes = 0;

    if (isToday) {
      nowMinutes = now.getHours() * 60 + now.getMinutes();
    }

    if (isToday) {
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

    return uniqueSlots;
  }
}
