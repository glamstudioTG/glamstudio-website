import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
  Body,
} from '@nestjs/common';
import { WorkerService } from './worker.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { WorkerGuard } from 'src/auth/guards/worker.guard';

@Controller('worker')
export class WorkerController {
  constructor(private service: WorkerService) {}

  @Get()
  findAll(@Query('categoryId') categoryId: string) {
    return this.service.findAll({ categoryId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtGuard, AdminGuard, WorkerGuard)
  @Patch(':id/categories')
  updateCategories(
    @Param('id') id: string,
    @Body() body: { categoryIds: string[] },
  ) {
    return this.service.updateWorker(id, body.categoryIds);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch(':id/desactive')
  desactivateWorker(@Param('id') id: string) {
    return this.service.deactivate(id);
  }
}
