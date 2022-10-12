import {
  Controller,
  Body,
  Post,
  Get,
  Delete,
  UseGuards,
  Param,
  Put,
} from '@nestjs/common';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private categorySerivce: CategoryService) {}

  @Post()
  @UseGuards(AdminGuard)
  createCategory(@Body() body: CreateCategoryDto) {
    return this.categorySerivce.createCategory(body);
  }

  @Get()
  getAll() {
    return this.categorySerivce.findAll();
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  removeCategory(@Param('id') id: string) {
    return this.categorySerivce.remove(id);
  }
}
