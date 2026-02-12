import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ScheduleBlockService } from '../schedule-block/schedule-block.service';
import { CreateScheduleBlockDto } from '../schedule-block/dto/create-schedule-block.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('admin/schedule-blocks')
@UseGuards(JwtGuard, AdminGuard)
export class GlobalScheduleBlockController {
  constructor(private readonly service: ScheduleBlockService) {}

  @Post()
  create(@Body() dto: CreateScheduleBlockDto) {
    return this.service.create(dto);
  }

  @Get('global')
  getAllGlobal() {
    return this.service.getAllGlobal();
  }

  @Get('global/:date')
  getGlobalByDate(@Param('date') date: string) {
    return this.service.getGlobalByDate(date);
  }

  @Delete('global/:id')
  delete(@Param('id') id: string) {
    return this.service.deleteGlobalBlock(id);
  }
}
