import { Controller, Get, Query } from '@nestjs/common';
import { AvailabilityService } from './availability.service';

@Controller('workers/:workerId/availability')
export class AvailabilityController {
  constructor(private service: AvailabilityService) {}
  @Get()
  getSlots(
    @Query('date') date: string,
    @Query('serviceDuration') duration: number,
    @Query('workerId') workerId: string,
  ) {
    return this.service.getAvailableSlots(workerId, date, Number(duration));
  }
}
