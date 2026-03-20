import { Controller, Get, Param, Query } from '@nestjs/common';
import { AvailabilityService } from './availability.service';

@Controller('workers/:workerId/availability')
export class AvailabilityController {
  constructor(private service: AvailabilityService) {}
  @Get()
  getSlots(
    @Param('workerId') workerId: string,
    @Query('date') date: string,
    @Query('serviceDuration') duration: number,
  ) {
    const [year, month, day] = date.split('-').map(Number);

    const safeDate = new Date(year, month - 1, day, 12, 0, 0);

    return this.service.getAvailableSlots(workerId, safeDate, Number(duration));
  }
}
