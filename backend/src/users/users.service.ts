import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/update-role.dto';
import { ChangeUserRoleDto } from './dto/change-role.dto';
import { Role } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  findByID(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  createUser(data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) {
    return this.prisma.user.create({ data });
  }

  async getProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, phone: true, role: true },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  getAllUsers() {
    return this.prisma.user.findMany({
      select: { id: true, name: true, email: true, phone: true, role: true },
    });
  }

  updateProfile(userId: string, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...data,
        role: undefined,
      },
    });
  }

  async changeUserRole(userId: string, dto: ChangeUserRoleDto) {
    if (!userId) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        role: dto.role,
      },
    });

    if (dto.role === Role.WORKER) {
      const existingWorker = await this.prisma.worker.findUnique({
        where: { userId },
      });

      if (!existingWorker) {
        await this.prisma.worker.create({
          data: {
            userId,
          },
        });
      }
    }

    return user;
  }
}
