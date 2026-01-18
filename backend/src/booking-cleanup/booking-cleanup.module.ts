import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookingCleanupService } from './booking-cleanup.service';

@Module({
  imports: [PrismaService],
  providers: [BookingCleanupService, PrismaService],
  exports: [BookingCleanupService],
})
export class BookingCleanupModule {}
