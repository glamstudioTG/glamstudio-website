import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { BookingModule } from './booking/booking.module';
import { ServicesModule } from './services/services.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { BusinessHoursModule } from './business-hours/business-hours.module';
import { ScheduleBlockModule } from './schedule-block/schedule-block.module';
import { OverrideHoursModule } from './override-hours/override-hours.module';
import { AvailabilityModule } from './availability/availability.module';
import { WorkerModule } from './worker/worker.module';
import { TransactionProofModule } from './transaction-proof/transaction-proof.module';
import { BookingExpirationModule } from './booking-expiration/booking-expiration.module';
import { BookingCleanupModule } from './booking-cleanup/booking-cleanup.module';
import { BookingCompletionModule } from './booking-completion/booking-completion.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { NotificationModule } from './notification/notification.module';
import { AdminStatsModule } from './admin-stats/admin-stats.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),

    NotificationModule,

    PrismaModule,

    BookingExpirationModule,
    BookingCleanupModule,
    BookingCompletionModule,

    CloudinaryModule,

    BookingModule,
    ServicesModule,
    UsersModule,
    AdminStatsModule,
    AuthModule,
    CategoryModule,
    BusinessHoursModule,
    ScheduleBlockModule,
    OverrideHoursModule,
    AvailabilityModule,
    WorkerModule,
    TransactionProofModule,
  ],
})
export class AppModule {}
