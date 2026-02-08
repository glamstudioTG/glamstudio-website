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
import { OverrideHoursService } from './override-hours.service';
import { CreateOverrideHoursDto } from './dto/create-override-hours.dto';
import { AdminOrWorkerGuard } from 'src/auth/guards/admin-or-worker.guard';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('workers/:workerId/override-hours')
export class OverrideHoursController {
  constructor(private service: OverrideHoursService) {}

  @Get('all')
  getAll(@Param('workerId') workerId: string) {
    return this.service.getAllByWorker(workerId);
  }

  @Get()
  getByDate(@Param('workerId') workerId: string, @Query('date') date: string) {
    return this.service.getByDate(workerId, date);
  }

  @Post()
  @UseGuards(JwtGuard, AdminOrWorkerGuard)
  create(
    @Param('workerId') workerId: string,
    @Body() dto: CreateOverrideHoursDto,
  ) {
    return this.service.create(workerId, dto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, AdminOrWorkerGuard)
  delete(@Param('workerId') workerId: string, @Param('id') id: string) {
    return this.service.delete(workerId, id);
  }
}
