import { Module } from '@nestjs/common';
import { BookingCompletionService } from './booking-completion.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BookingCompletionService],
  exports: [BookingCompletionService],
})
export class BookingCompletionModule {}
