import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ScheduleBlockService } from './schedule-block.service';
import { CreateScheduleBlockDto } from './dto/create-schedule-block.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminOrWorkerGuard } from 'src/auth/guards/admin-or-worker.guard';

@Controller('workers/:workerId/schedule-blocks')
@UseGuards(JwtGuard)
export class ScheduleBlockController {
  constructor(private service: ScheduleBlockService) {}

  @Post()
  @UseGuards(AdminOrWorkerGuard)
  create(
    @Param('workerId') workerId: string,
    @Body() dto: CreateScheduleBlockDto,
  ) {
    return this.service.create(dto, workerId);
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
