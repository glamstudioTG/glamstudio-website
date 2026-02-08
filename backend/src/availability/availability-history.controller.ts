import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AvailabilityHistoryService } from './availability-history.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminOrWorkerGuard } from 'src/auth/guards/admin-or-worker.guard';

@Controller('workers/:workerId/availability/history')
@UseGuards(JwtGuard, AdminOrWorkerGuard)
export class AvailabilityHistoryController {
  constructor(private readonly service: AvailabilityHistoryService) {}

  @Get()
  getHistory(@Param('workerId') workerId: string) {
    return this.service.getAll(workerId);
  }
}
