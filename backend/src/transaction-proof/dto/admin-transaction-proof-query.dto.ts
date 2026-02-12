import { IsOptional, IsString, IsEnum } from 'class-validator';
import { TransactionStatus } from '@prisma/client';

export class AdminTransactionProofQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  workerId?: string;

  @IsOptional()
  @IsString()
  serviceId?: string;

  @IsOptional()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus;

  @IsOptional()
  @IsEnum(['day', 'week', 'month'])
  period?: 'day' | 'week' | 'month';

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}
