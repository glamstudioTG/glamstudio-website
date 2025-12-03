import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async createBooking(dto: CreateBookingDto) {
    let userId = dto.userId;

    if (!userId) {
      if (!dto.email) {
        throw new BadRequestException(
          'Email is required when userId is not provided',
        );
      }
      if (!dto.name) {
        throw new BadRequestException(
          'Name is required when userId is not provided',
        );
      }
      if (!dto.phone) {
        throw new BadRequestException(
          'Phone is required when userId is not provided',
        );
      }
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existingUser) {
        userId = existingUser.id;
      } else {
        const newUser = await this.prisma.user.create({
          data: {
            name: dto.name,
            email: dto.email,
            phone: dto.phone,
          },
        });
        userId = newUser.id;
      }
    }

    const service = await this.prisma.service.findUnique({
      where: { id: dto.serviceId },
    });

    if (!service) {
      throw new NotFoundException('Service not found');
    }

    const booking = await this.prisma.booking.create({
      data: {
        userId,
        serviceId: dto.serviceId,
        date: new Date(dto.date),
        comment: dto.comment,
      },
    });

    return booking;
  }

  async cancelBooking(id: string) {}

  async confirmBooking(id: string) {}
}
