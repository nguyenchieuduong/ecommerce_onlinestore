import { Body, Controller, Post, Get, Delete } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { CurrentUser } from 'src/shared/decorators/current-user.decorators';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { Serialize } from 'src/shared/interceptors/serialize.interceptor';
import { UserResponse } from 'src/user/dtos/user-response.dto';
import { OrderDto } from './dtos/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  @UseGuards(AuthGuard)
  createOrder(@CurrentUser() user: UserResponse, @Body() body: OrderDto) {
    return this.orderService.createOrder(user, body);
  }

  @Get()
  @UseGuards(AuthGuard)
  findOrder(@CurrentUser() user: UserResponse) {
    return this.orderService.findOrder(user);
  }

  @Delete()
  @UseGuards(AuthGuard)
  async deleteOrder(@CurrentUser() user: UserResponse) {
    await this.orderService.removeOrder(user);
    return 'Successful delete order';
  }
}
