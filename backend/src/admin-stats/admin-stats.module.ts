import { Module } from '@nestjs/common';
import { AdminStatsService } from './admin-stats.service';
import { AdminStatsController } from './admin-stats.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AvailabilityService } from 'src/availability/availability.service';

@Module({
  controllers: [AdminStatsController],
  providers: [AdminStatsService, PrismaService, AvailabilityService],
})
export class AdminStatsModule {}
