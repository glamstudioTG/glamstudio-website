import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { minutesToHhmm } from "src/common/utils/time.utils";
import { substractRanges } from "src/common/utils/substractRanges";
import { localDateToUtc } from "src/common/utils/date.utils";
import { getDayOfWeekEnum } from "src/common/utils/day-of-week";



@Injectable()
export class AvailabilityService {
  constructor(private prisma: PrismaService) {}

  async getAvailableSlots(
    dateStr: string,
    serviceDuration: number,
    slotInterval?: number
  ) {
    const dateUtc = localDateToUtc(dateStr);
    const dayOfWeek = getDayOfWeekEnum(dateUtc);

    const blocks = await this.prisma.scheduleBlock.findMany({
      where: { date: dateUtc },
    });

    if (blocks.some(b => b.startTime == null && b.endTime == null)) {
      return [];
    }

    const overrides = await this.prisma.overrideHours.findMany({
      where: { date: dateUtc },
    });

    let baseRanges: Array<[number, number]> = [];

    if (overrides.length > 0) {
      baseRanges = overrides.map(o => [o.startTime, o.endTime]);
    } else {
      const businessHours = await this.prisma.businessHours.findMany({
        where: { day: dayOfWeek },
        orderBy: { startTime: 'asc' },
      });

      baseRanges = businessHours.map(b => [b.startTime, b.endTime]);
    }

    if (baseRanges.length === 0) return [];

    const blockRanges: Array<[number, number]> = [];

    for (const b of blocks) {
      if (b.startTime != null && b.endTime != null) {
        blockRanges.push([b.startTime, b.endTime]);
      }
    }

    const bookings = await this.prisma.booking.findMany({
      where: { date: dateUtc },
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

    if( isToday ) {
      freeRanges = freeRanges
      .map(([s, e]) => [Math.max(s, nowMinutes), e] as [number, number])
      .filter(([s, e]) => e - s >= serviceDuration)
    }

    const interval = slotInterval ?? serviceDuration;
    const slots: Array<{
      startMin: number;
      endMin: number;
      start: string;
      end: string;
    }> = [];

    for (const [fs, fe] of freeRanges) {
      let cursor = fs;
      while (cursor + serviceDuration <= fe) {
        slots.push({
          startMin: cursor,
          endMin: cursor + serviceDuration,
          start: minutesToHhmm(cursor),
          end: minutesToHhmm(cursor + serviceDuration),
        });
        cursor += interval;
      }
    }

    return slots;
  }
}