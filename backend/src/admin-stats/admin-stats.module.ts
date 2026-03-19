import { Module } from '@nestjs/common';
import { AdminStatsService } from './admin-stats.service';
import { AdminStatsController } from './admin-stats.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AvailabilityService } from 'src/availability/availability.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AvailabilityModule } from 'src/availability/availability.module';
import { TimeModule } from 'src/time/time.module';

@Module({
  imports: [PrismaModule, AvailabilityModule, TimeModule],
  controllers: [AdminStatsController],
  providers: [AdminStatsService, PrismaService, AvailabilityService],
})
export class AdminStatsModule {}
