import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  getAllProducts() {
    return this.productService.getAll();
  }

  @Post()
  @UseGuards(AdminGuard)
  createProduct(@Body() body: CreateProductDto) {
    return this.productService.createProduct(body);
  }

  @Get('/:slug')
  getBySlug(@Param('slug') slug: string) {
    return this.productService.findBySlug(slug);
  }

  @Put('/:slug')
  @UseGuards(AdminGuard)
  updateBySlug(@Param('slug') slug: string, @Body() body: UpdateProductDto) {
    return this.productService.updateBySlug(body, slug);
  }

  @Delete('/:slug')
  @UseGuards(AdminGuard)
  removeBySlug(@Param('slug') slug: string) {
    return this.productService.removeBySlug(slug);
  }
}
