import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateServiceDto } from "./dto/create-service.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ServicesService {

    constructor(private prisma: PrismaService ) {}
    
    async createServices(id: string, dto: CreateServiceDto) {

        const categoryExists = await this.prisma.category.findUnique({
            where: { id }
        });

        if (!categoryExists) {
            throw new NotFoundException('La categoría no existe.');
        }

        return await this.prisma.service.create({
            data: {
                ...dto,
                id
            }
        });
    }

    async getServices() {
        return await this.prisma.service.findMany({
            include: { category: true }
        });
    }

    async getServicesById(id: string) {
        const service = await this.prisma.service.findUnique({
            where: { id },
            include: { category: true }
        });

        if (!service) {
            throw new NotFoundException('Servicio no encontrado.');
        }

        return service;
    }

    async getServiceByCategory(categoryId: string) {
        return await this.prisma.service.findMany({
            where: { categoryId },
            include: { category: true }
        });
    }


    async updateService(id: string, dto: Partial<CreateServiceDto>) {

        const exists = await this.prisma.service.findUnique({
            where: { id }
        });

        if (!exists) {
            throw new NotFoundException('Servicio no encontrado.');
        }

        return await this.prisma.service.update({
            where: { id },
            data: dto
        });
    }

    async deleteService(id: string) {
        const exists = await this.prisma.service.findUnique({
            where: { id }
        });

        if (!exists) throw new NotFoundException('Servicio no encontrado.');

        return await this.prisma.service.delete({
            where: { id }
        });
    }

}