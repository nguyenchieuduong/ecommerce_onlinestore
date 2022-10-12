import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemService } from 'src/item/item.service';
import { UserResponse } from 'src/user/dtos/user-response.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { OrderDto } from './dtos/order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    private userService: UserService,
    private itemService: ItemService,
  ) {}

  async createOrder(body: UserResponse, { picks }: OrderDto) {
    const { username } = body;
    const existedOrder = await this.findOrder(body);
    console.log('ok');
    if (existedOrder)
      throw new HttpException(
        'Existed one order for your account',
        HttpStatus.NOT_ACCEPTABLE,
      );
    const newOrder = this.orderRepository.create({ amount: 0 });
    // set user
    const user = await this.userService.findByUsername(username);
    if (!user)
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    // set item
    Object.assign(newOrder, { user });
    const items = [];
    for (let i = 0; i < picks.length; i++) {
      items.push(await this.itemService.create(picks[i]));
    }
    const amount = items.reduce((e, v) => e + v.product.price * v.quantity, 0);
    Object.assign(newOrder, { items, amount });
    return this.orderRepository.save(newOrder);
  }

  async findOrder({ username }: UserResponse) {
    const order = await this.orderRepository
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.items', 'item')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('item.product', 'product')
      .where('user.username=:username', { username })
      .getOne();
    if (order && order.user && order.user.password) delete order.user.password;
    return order;
  }

  async removeOrder({ username }: UserResponse) {
    const order = await this.orderRepository.find({
      where: { user: { username } },
    });
    return this.orderRepository.remove(order);
  }

  remove(order: Order) {
    return this.orderRepository.remove(order);
  }
}
