import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('services')
export class ServicesController {
  constructor(private serviceService: ServicesService) {}

  @Get('search')
  searchServices(@Query('q') q: string) {
    return this.serviceService.searchServicesByName(q);
  }

  @Get()
  getServices() {
    return this.serviceService.getServices();
  }

  @Get('featured')
  getFeaturedServices() {
    return this.serviceService.getFeaturedServices();
  }

  @Get('category/:id')
  getServiceByCategory(@Param('id') id: string) {
    return this.serviceService.getServiceByCategory(id);
  }

  @Get(':id')
  getServiceById(@Param('id') id: string) {
    return this.serviceService.getServicesById(id);
  }

  @Get('worker/:workerId')
  getServiceByWorker(@Param('workerId') workerId: string) {
    return this.serviceService.getServiceByWorker(workerId);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Post(':categoryId')
  createService(
    @Param('categoryId') categoryId: string,
    @Body() dto: CreateServiceDto,
  ) {
    return this.serviceService.createServices(categoryId, dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Patch(':id')
  updateService(
    @Param('id') id: string,
    @Body() dto: Partial<UpdateServiceDto>,
  ) {
    return this.serviceService.updateService(id, dto);
  }

  @UseGuards(JwtGuard, AdminGuard)
  @Delete(':id')
  deleteService(@Param('id') id: string) {
    return this.serviceService.deleteService(id);
  }
}
