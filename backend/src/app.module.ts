import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { BookingModule } from './booking/booking.module';
import { ServicesModule } from './services/services.module';
import { ScheduleModule } from './schedule/schedule.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ServicesController } from './shedule/services/services.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    PrismaModule,

    BookingModule,
    ServicesModule,
    ScheduleModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [ServicesController],
})
export class AppModule {}
