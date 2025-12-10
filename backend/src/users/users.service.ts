import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { updateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

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

  createUser(data: { name: string; email: string; phone: string; password: string }) {
    return this.prisma.user.create({ data });
  }

  async getProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, phone: true, role: true },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado')
    }

    return user;
  }

  getAllUsers () {
    return this.prisma.user.findMany(
    { select: { id: true, name: true, email: true, phone: true, role: true } }
    )
  } 
  

  updateProfile(id: string, data: updateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
