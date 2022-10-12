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
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/products')
  getAllProducts(@Query('from') from: string, @Query('to') to: string) {
    return this.productService.getAll(parseInt(from), parseInt(to));
  }

  @Post('/products')
  @UseGuards(AdminGuard)
  createProduct(@Body() body: CreateProductDto) {
    return this.productService.createProduct(body);
  }

  @Get('product/:slug')
  getBySlug(@Param('slug') slug: string) {
    return this.productService.findBySlug(slug);
  }

  @Get('/products/query')
  getByCategory(
    @Query('category') category: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.productService.findByCategory(
      category,
      parseInt(from),
      parseInt(to),
    );
  }

  @Put('product/:slug')
  @UseGuards(AdminGuard)
  updateBySlug(@Param('slug') slug: string, @Body() body: UpdateProductDto) {
    return this.productService.updateBySlug(body, slug);
  }

  @Delete('product/:slug')
  @UseGuards(AdminGuard)
  removeBySlug(@Param('slug') slug: string) {
    return this.productService.removeBySlug(slug);
  }
}
