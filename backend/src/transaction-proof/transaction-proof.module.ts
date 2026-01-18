import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionProofController } from './transaction-proof.controller';
import { TransactionProofService } from './transaction-proof.service';

@Module({
  imports: [PrismaService],
  controllers: [TransactionProofController],
  providers: [TransactionProofService],
  exports: [TransactionProofService],
})
export class TransactionProofModule {}
