import { DayOfWeek } from '@prisma/client';
import { IsEnum, Matches } from 'class-validator';

const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

export class CreateBusinessHoursDto {
  @IsEnum(DayOfWeek)
  day!: DayOfWeek;

  @Matches(TIME_REGEX)
  startTime!: string;

  @Matches(TIME_REGEX)
  endTime!: string;
}
