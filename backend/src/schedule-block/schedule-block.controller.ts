import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ScheduleBlockService } from './schedule-block.service';
import { CreateScheduleBlockDto } from './dto/create-schedule-block.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminOrWorkerGuard } from 'src/auth/guards/admin-or-worker.guard';

@Controller('workers/:workerId/schedule-blocks')
@UseGuards(JwtGuard, AdminOrWorkerGuard)
export class ScheduleBlockController {
  constructor(private service: ScheduleBlockService) {}

  @Post()
  create(
    @Param('workerId') workerId: string,
    @Body() dto: CreateScheduleBlockDto,
  ) {
    return this.service.create(dto, workerId);
  }

  @Get()
  getByDate(@Param('workerId') workerId: string, @Query('date') date: string) {
    return this.service.getByDate(date, workerId);
  }

  @Delete(':id')
  delete(@Param('workerId') workerId: string, @Param('id') id: string) {
    return this.service.delete(id, workerId);
  }
}
