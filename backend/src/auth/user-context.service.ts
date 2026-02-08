import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class UserContextService {
  constructor(private prisma: PrismaService) {}

  async resolve(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        worker: {
          select: {
            id: true,
            isActive: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    return {
      userId: user.id,
      role: user.role,
      isAdmin: user.role === Role.ADMIN,
      isWorker: !!user.worker && user.worker.isActive,
      workerId: user.worker?.id ?? null,
    };
  }
}
