import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
