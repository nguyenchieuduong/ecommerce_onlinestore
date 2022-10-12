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
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger/dist/decorators';
import { AdminGuard } from 'src/shared/guards/admin.guard';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('/products')
  @ApiOperation({
    summary:
      'Get array of all products (may use query string "from" and "to" to pagination)',
  })
  @ApiResponse({
    status: 200,
    description: 'example response of product',
    schema: {
      properties: {
        id: {
          type: 'string',
          example: 'badca794-e1af-4981-87ca-3bbba0c53b01',
        },
        name: {
          type: 'string',
          example: 'Dell Precision M4700',
          description: 'name must be unique',
        },
        price: {
          type: 'integer',
          example: 5000,
          description: '5000$',
        },
        description: {
          type: 'string',
          example: 'This is best choice < 500$',
        },
        slug: {
          type: 'string',
          example: 'dell-precision-m4700',
          description: 'unique and created by name (name is unique)',
        },
        quantity: {
          type: 'integer',
          example: 100,
        },
        sold: {
          type: 'integer',
          example: 2,
          description: 'set equal 0 by default',
        },
        images: {
          type: 'string',
          example: '/',
          description: 'url of image',
        },
        categories: {
          type: 'array',
          example: [
            {
              name: 'Laptop',
            },
            {
              name: 'Lenovo',
            },
          ],
        },
      },
    },
  })
  getAllProducts(@Query('from') from: string, @Query('to') to: string) {
    return this.productService.getAll(parseInt(from), parseInt(to));
  }

  @Post('/product')
  @ApiOperation({ summary: '** Create product' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'Dell Precision M4700',
          description: 'name must be unique',
        },
        price: {
          type: 'integer',
          example: 5000,
          description: '5000$',
        },
        description: {
          type: 'string',
          example: 'This is best choice < 500$',
        },
        quantity: {
          type: 'integer',
          example: 100,
        },
        images: {
          type: 'string',
          example: '/',
          description: 'url of image',
        },
        categories: {
          type: 'array',
          example: [
            {
              name: 'Laptop',
            },
            {
              name: 'Lenovo',
            },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'example response of product',
    schema: {
      properties: {
        id: {
          type: 'string',
          example: 'badca794-e1af-4981-87ca-3bbba0c53b01',
        },
        name: {
          type: 'string',
          example: 'Dell Precision M4700',
          description: 'name must be unique',
        },
        price: {
          type: 'integer',
          example: 5000,
          description: '5000$',
        },
        description: {
          type: 'string',
          example: 'This is best choice < 500$',
        },
        slug: {
          type: 'string',
          example: 'dell-precision-m4700',
          description: 'unique and created by name (name is unique)',
        },
        quantity: {
          type: 'integer',
          example: 100,
        },
        sold: {
          type: 'integer',
          example: 2,
          description: 'set equal 0 by default',
        },
        images: {
          type: 'string',
          example: '/',
          description: 'url of image',
        },
        categories: {
          type: 'array',
          example: [
            {
              name: 'Laptop',
            },
            {
              name: 'Lenovo',
            },
          ],
        },
      },
    },
  })
  @UseGuards(AdminGuard)
  createProduct(@Body() body: CreateProductDto) {
    return this.productService.createProduct(body);
  }

  @Get('product/:slug')
  @ApiOperation({ summary: 'Get product by slug' })
  @ApiResponse({
    status: 200,
    description: 'example response of product',
    schema: {
      properties: {
        id: {
          type: 'string',
          example: 'badca794-e1af-4981-87ca-3bbba0c53b01',
        },
        name: {
          type: 'string',
          example: 'Dell Precision M4700',
          description: 'name must be unique',
        },
        price: {
          type: 'integer',
          example: 5000,
          description: '5000$',
        },
        description: {
          type: 'string',
          example: 'This is best choice < 500$',
        },
        slug: {
          type: 'string',
          example: 'dell-precision-m4700',
          description: 'unique and created by name (name is unique)',
        },
        quantity: {
          type: 'integer',
          example: 100,
        },
        sold: {
          type: 'integer',
          example: 2,
          description: 'set equal 0 by default',
        },
        images: {
          type: 'string',
          example: '/',
          description: 'url of image',
        },
        categories: {
          type: 'array',
          example: [
            {
              name: 'Laptop',
            },
            {
              name: 'Lenovo',
            },
          ],
        },
      },
    },
  })
  getBySlug(@Param('slug') slug: string) {
    return this.productService.findBySlug(slug);
  }

  @Get('/products/query')
  @ApiResponse({
    status: 200,
    description: 'example response of product',
    schema: {
      properties: {
        id: {
          type: 'string',
          example: 'badca794-e1af-4981-87ca-3bbba0c53b01',
        },
        name: {
          type: 'string',
          example: 'Dell Precision M4700',
          description: 'name must be unique',
        },
        price: {
          type: 'integer',
          example: 5000,
          description: '5000$',
        },
        description: {
          type: 'string',
          example: 'This is best choice < 500$',
        },
        slug: {
          type: 'string',
          example: 'dell-precision-m4700',
          description: 'unique and created by name (name is unique)',
        },
        quantity: {
          type: 'integer',
          example: 100,
        },
        sold: {
          type: 'integer',
          example: 2,
          description: 'set equal 0 by default',
        },
        images: {
          type: 'string',
          example: '/',
          description: 'url of image',
        },
        categories: {
          type: 'array',
          example: [
            {
              name: 'Laptop',
            },
            {
              name: 'Lenovo',
            },
          ],
        },
      },
    },
  })
  @ApiOperation({
    summary:
      'Get array of all products by category ("/query?category=laptop") (may use query string "from" and "to" to pagination)',
  })
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
  @ApiOperation({
    summary:
      '** Update product by slug (payload can have any field same create product except "name")',
  })
  @ApiResponse({
    status: 200,
    description: 'example response of product',
    schema: {
      properties: {
        id: {
          type: 'string',
          example: 'badca794-e1af-4981-87ca-3bbba0c53b01',
        },
        name: {
          type: 'string',
          example: 'Dell Precision M4700',
          description: 'name must be unique',
        },
        price: {
          type: 'integer',
          example: 5000,
          description: '5000$',
        },
        description: {
          type: 'string',
          example: 'This is best choice < 500$',
        },
        slug: {
          type: 'string',
          example: 'dell-precision-m4700',
          description: 'unique and created by name (name is unique)',
        },
        quantity: {
          type: 'integer',
          example: 100,
        },
        sold: {
          type: 'integer',
          example: 2,
          description: 'set equal 0 by default',
        },
        images: {
          type: 'string',
          example: '/',
          description: 'url of image',
        },
        categories: {
          type: 'array',
          example: [
            {
              name: 'Laptop',
            },
            {
              name: 'Lenovo',
            },
          ],
        },
      },
    },
  })
  updateBySlug(@Param('slug') slug: string, @Body() body: UpdateProductDto) {
    return this.productService.updateBySlug(body, slug);
  }

  @Delete('product/:slug')
  @ApiOperation({ summary: '** Remove product by slug' })
  @UseGuards(AdminGuard)
  removeBySlug(@Param('slug') slug: string) {
    return this.productService.removeBySlug(slug);
  }
}
