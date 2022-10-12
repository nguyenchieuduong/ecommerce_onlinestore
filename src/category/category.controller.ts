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
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist/decorators';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller('category')
@ApiTags('Category')
export class CategoryController {
  constructor(private categorySerivce: CategoryService) {}

  @Post()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: '** Create category' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Laptop',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    schema: {
      properties: {
        id: {
          type: 'integer',
          example: 1,
        },
        name: {
          type: 'string',
          example: 'Laptop',
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Existed this category',
  })
  createCategory(@Body() body: CreateCategoryDto) {
    return this.categorySerivce.createCategory(body);
  }

  @Get()
  @ApiOperation({ summary: 'Get array of all categories' })
  getAll() {
    return this.categorySerivce.findAll();
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: '** Remove particular category by id' })
  removeCategory(@Param('id') id: string) {
    return this.categorySerivce.remove(id);
  }
}
