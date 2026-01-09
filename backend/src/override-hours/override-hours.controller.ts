import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OverrideHoursService } from './override-hours.service';
import { CreateOverrideHoursDto } from './dto/create-override-hours.dto';
import { AdminOrWorkerGuard } from 'src/auth/guards/admin-or-worker.guard';

@Controller('workers/:workerId/override-hours')
export class OverrideHoursController {
  constructor(private service: OverrideHoursService) {}

  @Post()
  @UseGuards(AdminOrWorkerGuard)
  create(
    @Param('workerId') workerId: string,
    @Body() dto: CreateOverrideHoursDto,
  ) {
    return this.service.create(workerId, dto);
  }

  @Get(':date')
  getByDate(@Param('workerId') workerId: string, @Param('date') date: string) {
    return this.service.getByDate(workerId, date);
  }

  @Delete(':id')
  @UseGuards(AdminOrWorkerGuard)
  delete(@Param('workerId') workerId: string, @Param('id') id: string) {
    return this.service.delete(workerId, id);
  }
}
