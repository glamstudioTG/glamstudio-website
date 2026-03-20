import { Injectable } from '@nestjs/common';
import { toZonedTime, fromZonedTime } from 'date-fns-tz';
import { startOfDay, endOfDay, isSameDay } from 'date-fns';

@Injectable()
export class TimeService {
  private readonly BUSINESS_TZ = 'America/Bogota';

  toUtc(date: string | Date): Date {
    const d =
      date instanceof Date
        ? new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            12, // 👈 clave
            0,
            0,
          )
        : new Date(date);

    return fromZonedTime(d, this.BUSINESS_TZ);
  }

  toLocal(dateUtc: Date): Date {
    return toZonedTime(dateUtc, this.BUSINESS_TZ);
  }

  getDayBounds(dateUtc: Date) {
    const local = this.toLocal(dateUtc);

    const startLocal = startOfDay(local);
    const endLocal = endOfDay(local);

    return {
      startUtc: fromZonedTime(startLocal, this.BUSINESS_TZ),
      endUtc: fromZonedTime(endLocal, this.BUSINESS_TZ),
    };
  }

  getDayOfWeek(dateUtc: Date): number {
    const local = this.toLocal(dateUtc);
    return local.getDay();
  }

  isToday(dateUtc: Date): boolean {
    const nowUtc = new Date();
    const localNow = this.toLocal(nowUtc);
    const localDate = this.toLocal(dateUtc);

    return isSameDay(localNow, localDate);
  }

  nowMinutes(): number {
    const nowUtc = new Date();
    const local = this.toLocal(nowUtc);

    return local.getHours() * 60 + local.getMinutes();
  }

  minutesToUtc(dateUtc: Date, minutes: number): Date {
    const local = this.toLocal(dateUtc);

    local.setHours(0, 0, 0, 0);
    local.setMinutes(minutes);

    return fromZonedTime(local, this.BUSINESS_TZ);
  }
}
