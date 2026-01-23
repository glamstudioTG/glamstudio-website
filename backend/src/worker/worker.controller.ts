import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
  Body,
  Post,
} from '@nestjs/common';
import { WorkerService } from './worker.service';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { AdminOrWorkerGuard } from 'src/auth/guards/admin-or-worker.guard';
import { UpdateProfileWorkerDto } from './dto/update-profile-worker.dto';

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

  @Post('by-services')
  findWorkersByServices(@Body() body: { serviceIds: string[] }) {
    return this.service.findWorkersByServiceIds(body.serviceIds);
  }

  @UseGuards(JwtGuard, AdminOrWorkerGuard)
  @Patch(':workerId/categories')
  updateCategories(
    @Param('workerId') workerId: string,
    @Body() body: { categoryIds: string[] },
  ) {
    return this.service.updateWorkerCategories(workerId, body.categoryIds);
  }

  @UseGuards(JwtGuard, AdminOrWorkerGuard)
  @Patch(':workerId/profile')
  updateProfile(
    @Param('workerId') workerId: string,
    @Body() dto: UpdateProfileWorkerDto,
  ) {
    return this.service.updateWorkerInfo(workerId, dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch(':id/desactive')
  desactivateWorker(@Param('id') id: string) {
    return this.service.deactivate(id);
  }
}
