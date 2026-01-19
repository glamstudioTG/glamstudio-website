import { Module } from '@nestjs/common';
import { BookingCleanupService } from './booking-cleanup.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BookingCleanupService],
  exports: [BookingCleanupService],
})
export class BookingCleanupModule {}
