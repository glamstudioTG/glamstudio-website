import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(dto: CreateCategoryDto) {
    return await this.prisma.category.create({
      data: dto,
    });
  }

  async getAllCategories() {
    return await this.prisma.category.findMany();
  }

  async getCategoryById(id: string) {
    return await this.prisma.category.findUnique({
      where: { id },
      select: { id: true, name: true },
    });
  }

  async deleteCategory(id: string) {
    return await this.prisma.category.delete({
      where: { id },
    });
  }

  async updateCategory(id: string, dto: any) {
    return await this.prisma.category.update({
      where: { id },
      data: dto,
    });
  }
}