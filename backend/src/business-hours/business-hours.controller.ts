import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BusinessHoursService } from './business-hours.service';
import { CreateBusinessHoursDto } from './dto/create-business-hours.dto';
import { DayOfWeek } from '@prisma/client';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { WorkerGuard } from 'src/auth/guards/worker.guard';
import { AdminOrWorkerGuard } from 'src/auth/guards/admin-or-worker.guard';

@Controller('workers/:workerId/business-hours')
export class BusinessHoursController {
  constructor(private service: BusinessHoursService) {}

  @UseGuards(JwtGuard, AdminOrWorkerGuard)
  @Post()
  create(
    @Body() dto: CreateBusinessHoursDto,
    @Param('workerId') workerId: string,
  ) {
    return this.service.create(workerId, dto);
  }

  @Get()
  getByWorker(@Param('workerId') workerId: string) {
    return this.service.getByWorker(workerId);
  }

  @Get('day/:day')
  getByDay(@Param('day') day: DayOfWeek, @Param('workerId') workerId: string) {
    return this.service.getByDay(workerId, day);
  }

  @UseGuards(JwtGuard, AdminOrWorkerGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: Partial<CreateBusinessHoursDto>,
    @Param('workerId') workerId: string,
  ) {
    return this.service.update(id, workerId, dto);
  }

  @UseGuards(JwtGuard, AdminOrWorkerGuard)
  @Delete(':id')
  delete(@Param('id') id: string, @Param('workerId') workerId: string) {
    return this.service.delete(id, workerId);
  }
}
