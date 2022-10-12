import { Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist/decorators';
import { CurrentUser } from 'src/shared/decorators/current-user.decorators';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { UserResponse } from 'src/user/dtos/user-response.dto';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private stripeService: StripeService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary:
      '* Get STRIPE SECRET to pay money (make sure that exist an order of this user)',
  })
  @ApiTags('Payment')
  @ApiResponse({
    status: 200,
    description: 'Successfully get stripe serect to pay money',
    schema: {
      properties: {
        clientSecret: {
          type: 'string',
          example:
            'pi_3Ls6lmKo6s4sjA1n0axCw02M_secret_3OCpCL6TCe5SRdtS3mAOx741x',
          description:
            'This is a token to call api via one library provided by Stripe',
        },
        orderTotal: {
          type: 'integer',
          example: 10000,
          description: '10000$, total money of your order',
        },
      },
    },
  })
  @ApiResponse({
    status: 403,
    description: 'Not authorized yet',
    schema: {
      properties: {
        statusCode: {
          type: 'integer',
          example: 403,
          description: 'Status code',
        },
        message: {
          type: 'string',
          example: 'Forbidden resource',
        },
        error: {
          type: 'string',
          example: 'Forbidden',
        },
      },
    },
  })
  createPaymentIntent(@CurrentUser() currentUser: UserResponse) {
    return this.stripeService.createPaymentIntent(currentUser);
  }
}
