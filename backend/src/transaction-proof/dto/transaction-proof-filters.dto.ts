import { IsOptional, IsEnum, IsString } from 'class-validator';
import { BookingStatus } from '@prisma/client';

export class TransactionProofFiltersDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(['day', 'week', 'month'])
  period?: 'day' | 'week' | 'month';

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;
}
