import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { registerUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  createUser(data: registerUserDto) {
    return this.prisma.user.create({ data });
  }

  findProfile(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, phone: true, role: true },
    });
  }

  updateProfile(id: string, data: registerUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
