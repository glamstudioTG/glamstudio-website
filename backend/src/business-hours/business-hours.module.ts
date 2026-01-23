import { Module } from '@nestjs/common';
import { BusinessHoursController } from './business-hours.controller';
import { BusinessHoursService } from './business-hours.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AdminOrWorkerGuard } from 'src/auth/guards/admin-or-worker.guard';

@Module({
  imports: [PrismaModule],
  controllers: [BusinessHoursController],
  providers: [BusinessHoursService, AdminOrWorkerGuard],
  exports: [BusinessHoursService],
})
export class BusinessHoursModule {}
