import { Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from 'src/shared/decorators/current-user.decorators';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { UserResponse } from 'src/user/dtos/user-response.dto';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post()
  @UseGuards(AuthGuard)
  createPaymentIntent(@CurrentUser() currentUser: UserResponse) {
    return this.stripeService.createPaymentIntent(currentUser);
  }
}
