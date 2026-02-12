import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateProfileWorkerDto } from './dto/update-profile-worker.dto';

@Injectable()
export class WorkerService {
  constructor(private prisma: PrismaService) {}

  findAll(filters?: { categoryId: string }) {
    return this.prisma.worker.findMany({
      where: {
        isActive: true,
        ...(filters?.categoryId && {
          categories: {
            some: { categoryId: filters.categoryId },
          },
        }),
      },
      include: {
        user: { select: { name: true } },
        categories: { include: { category: true } },
      },
    });
  }

  async findOne(workerId: string) {
    const worker = await this.prisma.worker.findUnique({
      where: { id: workerId },
      include: {
        user: true,
        categories: { include: { category: true } },
      },
    });

    if (!worker) {
      throw new NotFoundException('trabajador no encontrado');
    }

    return worker;
  }

  async findWorkersByServiceIds(serviceIds: string[]) {
    if (!serviceIds || serviceIds.length === 0) {
      throw new BadRequestException('Selecciona al menos un servicio');
    }

    const workers = await this.prisma.worker.findMany({
      where: {
        isActive: true,
        AND: serviceIds.map((serviceId) => ({
          categories: {
            some: {
              category: {
                services: {
                  some: {
                    id: serviceId,
                  },
                },
              },
            },
          },
        })),
      },
      select: {
        id: true,
        avatar: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    if (workers.length === 0) {
      throw new BadRequestException(
        'Ningún trabajador puede realizar todos los servicios seleccionados juntos. Intenta seleccionar menos servicios o combinaciones distintas.',
      );
    }

    return workers;
  }

  async updateWorkerCategories(workerId: string, categoryIds: string[]) {
    const worker = await this.prisma.worker.findUnique({
      where: { id: workerId },
    });

    if (!worker) {
      throw new NotFoundException('Worker no encontrado');
    }

    await this.prisma.workerCategory.deleteMany({
      where: { workerId },
    });

    if (categoryIds.length > 0) {
      await this.prisma.workerCategory.createMany({
        data: categoryIds.map((categoryId) => ({
          workerId,
          categoryId,
        })),
      });
    }

    return { ok: true };
  }

  async updateWorkerInfo(workerId: string, dto: UpdateProfileWorkerDto) {
    const worker = await this.prisma.worker.findUnique({
      where: { id: workerId },
    });

    if (!worker) {
      throw new NotFoundException('Worker no encontrado');
    }

    return this.prisma.worker.update({
      where: { id: workerId },
      data: dto,
      include: {
        user: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async deactivate(workerId: string) {
    return this.prisma.worker.update({
      where: { id: workerId },
      data: {
        isActive: false,
        deactivatedAt: new Date(),
      },
    });
  }

  async deleteInactiveWorkers() {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    await this.prisma.worker.deleteMany({
      where: {
        isActive: false,
        deactivatedAt: {
          lte: twoWeeksAgo,
        },
      },
    });
  }
}
