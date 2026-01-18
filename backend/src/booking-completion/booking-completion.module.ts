import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookingCompletionService } from './booking-completion.service';

@Module({
  imports: [PrismaService],
  providers: [BookingCompletionService, PrismaService],
  exports: [BookingCompletionService],
})
export class BookingCompletionModule {}
