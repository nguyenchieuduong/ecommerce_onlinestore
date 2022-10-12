import { Body, Controller, Post, Get, Delete } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist/decorators';
import { CurrentUser } from 'src/shared/decorators/current-user.decorators';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { UserResponse } from 'src/user/dtos/user-response.dto';
import { OrderDto } from './dtos/order.dto';
import { OrderService } from './order.service';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: '* Create order' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        picks: {
          type: 'array',
          example: [
            {
              name: 'Dell Precision M4700',
              quantity: 2,
            },
            {
              name: 'Lenovo Thinkbook 16G4+',
              quantity: 1,
            },
          ],
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully create an order',
    schema: {
      properties: {
        id: {
          type: 'integer',
          example: 1,
        },
        user: {
          type: 'object',
          example: {
            id: '98105b5f-ea65-4711-82e6-b8709d0d21c3',
            username: 'HoangNV123',
            isAdmin: true,
            isActived: true,
          },
        },
        items: {
          type: 'array',
          example: [
            {
              product: {
                id: 'badca794-e1af-4981-87ca-3bbba0c53b01',
                name: 'Dell Precision M4700',
                price: 50000,
                description: 'The black rose shall bloom once more',
                slug: 'dell-precision-m4700',
                quantity: 98,
                sold: 2,
                imageUrl: '/',
                categories: [
                  {
                    id: 1,
                    name: 'Laptop',
                  },
                  {
                    id: 3,
                    name: 'Lenovo',
                  },
                ],
              },
              quantity: 2,
              id: 7,
            },
          ],
          description: 'These are products that populate by picks',
        },
        amount: {
          type: 'integer',
          example: 10000,
          description: 'basket total: 10000$',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Existed one order for your account',
    schema: {
      properties: {
        statusCode: {
          type: 'integer',
          example: 406,
          description: 'Status code',
        },
        message: {
          type: 'string',
          example: 'Existed one order for your account',
        },
      },
    },
  })
  @UseGuards(AuthGuard)
  createOrder(@CurrentUser() user: UserResponse, @Body() body: OrderDto) {
    return this.orderService.createOrder(user, body);
  }

  @ApiOperation({ summary: '* Get order' })
  @ApiResponse({
    status: 200,
    description: 'Get order of this user',
    schema: {
      properties: {
        id: {
          type: 'integer',
          example: 1,
        },
        user: {
          type: 'object',
          example: {
            id: '98105b5f-ea65-4711-82e6-b8709d0d21c3',
            username: 'HoangNV123',
            isAdmin: true,
            isActived: true,
          },
        },
        items: {
          type: 'array',
          example: [
            {
              product: {
                id: 'badca794-e1af-4981-87ca-3bbba0c53b01',
                name: 'Dell Precision M4700',
                price: 50000,
                description: 'The black rose shall bloom once more',
                slug: 'dell-precision-m4700',
                quantity: 98,
                sold: 2,
                imageUrl: '/',
                categories: [
                  {
                    id: 1,
                    name: 'Laptop',
                  },
                  {
                    id: 3,
                    name: 'Lenovo',
                  },
                ],
              },
              quantity: 2,
              id: 7,
            },
          ],
          description: 'These are products that populate by picks',
        },
        amount: {
          type: 'integer',
          example: 10000,
          description: 'basket total: 10000$',
        },
      },
    },
  })
  @Get()
  @UseGuards(AuthGuard)
  findOrder(@CurrentUser() user: UserResponse) {
    return this.orderService.findOrder(user);
  }

  @Delete()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '* Remove order' })
  async deleteOrder(@CurrentUser() user: UserResponse) {
    await this.orderService.removeOrder(user);
    return 'Successful delete order';
  }
}
