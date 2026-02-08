import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AvailabilityController } from './availability.controller';
import { AvailabilityService } from './availability.service';
import { AvailabilityHistoryController } from './availability-history.controller';
import { AvailabilityHistoryService } from './availability-history.service';
import { ScheduleBlockModule } from 'src/schedule-block/schedule-block.module';
import { OverrideHoursModule } from 'src/override-hours/override-hours.module';

@Module({
  imports: [PrismaModule, ScheduleBlockModule, OverrideHoursModule],
  controllers: [AvailabilityController, AvailabilityHistoryController],
  providers: [AvailabilityService, AvailabilityHistoryService],
  exports: [AvailabilityService, AvailabilityHistoryService],
})
export class AvailabilityModule {}
