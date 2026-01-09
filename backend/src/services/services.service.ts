import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async createServices(categoryId: string, dto: CreateServiceDto) {
    const categoryExists = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!categoryExists) {
      throw new NotFoundException('La categoría no existe.');
    }

    return await this.prisma.service.create({
      data: {
        ...dto,
        categoryId,
      },
    });
  }

  async getServices() {
    return await this.prisma.service.findMany({
      include: { category: true },
    });
  }

  async getServicesById(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: { category: true },
    });

    if (!service) {
      throw new NotFoundException('Servicio no encontrado.');
    }

    return service;
  }

  async getServiceByCategory(categoryId: string) {
    return await this.prisma.service.findMany({
      where: { categoryId },
      include: { category: true },
    });
  }

  async getServiceByWorker(workerId: string) {
    return this.prisma.service.findMany({
      where: {
        category: {
          workerCategories: {
            some: { workerId },
          },
        },
      },
      include: { category: true },
    });
  }

  async updateService(id: string, dto: Partial<UpdateServiceDto>) {
    const exists = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!exists) {
      throw new NotFoundException('Servicio no encontrado.');
    }

    return await this.prisma.service.update({
      where: { id },
      data: dto,
    });
  }

  async deleteService(id: string) {
    const exists = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!exists) throw new NotFoundException('Servicio no encontrado.');

    return await this.prisma.service.delete({
      where: { id },
    });
  }
}
