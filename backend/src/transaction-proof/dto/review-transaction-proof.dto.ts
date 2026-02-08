import { IsEnum } from 'class-validator';
import { TransactionStatus } from '@prisma/client';

export class ReviewTransactionProofDto {
  @IsEnum(TransactionStatus)
  status!: TransactionStatus;
}
