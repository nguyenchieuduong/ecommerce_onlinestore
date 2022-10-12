import { Controller, Post, Get } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger/dist/decorators';
import { CurrentUser } from 'src/shared/decorators/current-user.decorators';
import { ReviewService } from './review.service';

@Controller('review')
@ApiTags('Review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  @ApiOperation({
    summary:
      '* Create reviews after pay money via stripe (submit order) and remove current order',
  })
  @ApiResponse({
    status: 200,
    description: 'Get reviews array that just created of this user',
    schema: {
      properties: {
        id: {
          type: 'id',
          example: '1',
        },
        quantity: {
          type: 'integer',
          example: 2,
        },
        price: {
          type: 'integer',
          example: '100000',
          description: 'price of product',
        },
        isDelivery: {
          type: 'boolean',
          example: false,
        },
        isPaid: {
          type: 'boolean',
          example: true,
        },
        product: {
          type: 'object',
          example: {
            id: 'badca794-e1af-4981-87ca-3bbba0c53b01',
            name: 'Dell Precision M4700',
            price: 50000,
            description: 'The black rose shall bloom once more',
            slug: 'dell-precision-m4700',
            quantity: 98,
            sold: 2,
            imageUrl: '/',
          },
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
      },
    },
  })
  createReview(@CurrentUser() user) {
    return this.reviewService.createReview(user);
  }

  @Get()
  @ApiOperation({ summary: '* Get all reviews of this user' })
  @ApiResponse({
    status: 200,
    description: 'Get reviews array of this user',
    schema: {
      properties: {
        id: {
          type: 'id',
          example: '1',
        },
        quantity: {
          type: 'integer',
          example: 2,
        },
        price: {
          type: 'integer',
          example: '100000',
          description: 'price of product',
        },
        isDelivery: {
          type: 'boolean',
          example: false,
        },
        isPaid: {
          type: 'boolean',
          example: true,
        },
        product: {
          type: 'object',
          example: {
            id: 'badca794-e1af-4981-87ca-3bbba0c53b01',
            name: 'Dell Precision M4700',
            price: 50000,
            description: 'The black rose shall bloom once more',
            slug: 'dell-precision-m4700',
            quantity: 98,
            sold: 2,
            imageUrl: '/',
          },
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
      },
    },
  })
  getReviews(@CurrentUser() user) {
    return this.reviewService.findReviews(user);
  }
}
