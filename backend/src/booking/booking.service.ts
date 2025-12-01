import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateBookingDto } from "./dto/create-booking.dto";


@Injectable()
export class BookingService {
    constructor(private prisma: PrismaService) { }

    async createBooking(dto: CreateBookingDto) {

        const service = await this.prisma.service.findUnique({
            where: { id: dto.serviceId }
        })

        if (!service) {
            throw new NotFoundException('Service not found')
        }

        const booking = await this.prisma.booking.create({
            data: {
                userId: dto.userId,
                serviceId: dto.serviceId,
                date: new Date(dto.date),
                commet: dto.comment
            }
        })

        return booking;
    }

    async cancelBooking(id: string) {

    }

    async confirmBooking(id: string) {

    }
}