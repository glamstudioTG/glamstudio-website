import { IsOptional, IsIn, IsDateString } from 'class-validator';

export class GetBookingsDto {
  @IsOptional()
  @IsIn(['day', 'week', 'month'])
  view?: 'day' | 'week' | 'month';

  @IsOptional()
  @IsDateString()
  date?: string;
}
