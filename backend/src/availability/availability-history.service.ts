import { Injectable } from '@nestjs/common';
import { ScheduleBlockService } from '../schedule-block/schedule-block.service';
import { OverrideHoursService } from '../override-hours/override-hours.service';

@Injectable()
export class AvailabilityHistoryService {
  constructor(
    private readonly scheduleBlockService: ScheduleBlockService,
    private readonly overrideHoursService: OverrideHoursService,
  ) {}

  async getAll(workerId: string) {
    const [blocks, overrides] = await Promise.all([
      this.scheduleBlockService.getAllByWorker(workerId),
      this.overrideHoursService.getAllByWorker(workerId),
    ]);

    return {
      blocks,
      overrides,
    };
  }
}
