import { Module } from '@nestjs/common';
import { TransactionProofController } from './transaction-proof.controller';
import { TransactionProofService } from './transaction-proof.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AvailabilityService } from 'src/availability/availability.service';

@Module({
  imports: [PrismaModule],
  controllers: [TransactionProofController],
  providers: [TransactionProofService, AvailabilityService],
  exports: [TransactionProofService, AvailabilityService],
})
export class TransactionProofModule {}
