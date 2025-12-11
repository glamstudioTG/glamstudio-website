import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { JwtGuard } from "src/auth/guards/jwt-auth.guard";
import { AdminGuard } from "src/auth/guards/admin.guard";

@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService) {}


    @Get()
    getCategories() {
        return this.categoryService.getAllCategories();
    }

    @Get(':id')
    getCategoryById(@Param('id') id: string) {
        return this.categoryService.getCategoryById(id);
    }

    @UseGuards(JwtGuard, AdminGuard)
    @Post()
    createCategory(@Body() dto: CreateCategoryDto){
        return this.categoryService.createCategory(dto);
    }

    @UseGuards(JwtGuard, AdminGuard)
    @Patch(':id')
    updateCategory(@Param('id') id: string,@Body() dto: UpdateCategoryDto) {
        return this.categoryService.updateCategory(id, dto);
    }

    @UseGuards(JwtGuard, AdminGuard)
    @Delete(':id')
    deleteCategory(@Param('id') id: string) {
        return this.categoryService.deleteCategory(id)
    }
}