import { Module } from '@nestjs/common';
import { BookingExpirationService } from './booking-expiration.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BookingExpirationService],
  exports: [BookingExpirationService],
})
export class BookingExpirationModule {}
