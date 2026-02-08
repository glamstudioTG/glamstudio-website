import { IsDateString, IsOptional, Matches } from 'class-validator';

const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

export class CreateScheduleBlockDto {
  @IsDateString()
  date!: string;

  @IsOptional()
  @Matches(TIME_REGEX)
  startTime?: string;

  @IsOptional()
  @Matches(TIME_REGEX)
  endTime?: string;

  @IsOptional()
  reason?: string;
}
