import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { STRIPE_SECRET } from 'src/constants/stripe';
import { OrderService } from 'src/order/order.service';
import { UserResponse } from 'src/user/dtos/user-response.dto';
const stripe = require('stripe')(STRIPE_SECRET);

@Injectable()
export class StripeService {
  constructor(private orderService: OrderService) {}

  async createPaymentIntent(user: UserResponse) {
    const order = await this.orderService.findOrder(user);
    if (!order)
      throw new HttpException('Not found your order', HttpStatus.NOT_FOUND);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.amount,
      currency: 'usd',
    });
    return {
      clientSecret: paymentIntent.client_secret,
      orderTotal: order.amount,
    };
  }
}
