import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookingExpirationService } from './booking-expiration.service';

@Module({
  imports: [PrismaService],
  providers: [BookingExpirationService, PrismaService],
  exports: [BookingExpirationService],
})
export class BookingExpirationModule {}
