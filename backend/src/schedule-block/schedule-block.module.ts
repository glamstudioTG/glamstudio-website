import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ScheduleBlockController } from './schedule-block.controller';
import { GlobalScheduleBlockController } from './global-schedule-block.controller';
import { ScheduleBlockService } from './schedule-block.service';

@Module({
  imports: [PrismaModule],
  controllers: [ScheduleBlockController, GlobalScheduleBlockController],
  providers: [ScheduleBlockService],
  exports: [ScheduleBlockService],
})
export class ScheduleBlockModule {}
