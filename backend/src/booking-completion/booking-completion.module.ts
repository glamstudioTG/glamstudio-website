import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookingCompletionService } from './booking-completion.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],

  providers: [BookingCompletionService, PrismaService],
  exports: [BookingCompletionService],
})
export class BookingCompletionModule {}
