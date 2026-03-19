import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AvailabilityService } from 'src/availability/availability.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AvailabilityModule } from 'src/availability/availability.module';
import { TimeModule } from 'src/time/time.module';

@Module({
  imports: [PrismaModule, AvailabilityModule, TimeModule],
  controllers: [BookingController],
  providers: [BookingService, PrismaService, AvailabilityService],
})
export class BookingModule {}
