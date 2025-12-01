import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { ServicesModule } from './services/services.module';
import { ScheduleModule } from './schedule/schedule.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [BookingModule, ServicesModule, ScheduleModule, UsersModule, AuthModule, PrismaModule],
})
export class AppModule { }
