import { Module } from '@nestjs/common';
import { OrderModule } from 'src/order/order.module';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';

@Module({
  controllers: [StripeController],
  providers: [StripeService],
  imports: [OrderModule],
})
export class StripeModule {}
