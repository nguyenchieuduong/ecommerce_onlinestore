import { Controller, Post, Get } from '@nestjs/common';
import { CurrentUser } from 'src/shared/decorators/current-user.decorators';
import { ReviewService } from './review.service';

@Controller('review')
export class ReviewController {
  constructor(private reviewService: ReviewService) {}

  @Post()
  createReview(@CurrentUser() user) {
    return this.reviewService.createReview(user);
  }

  @Get()
  getReviews(@CurrentUser() user) {
    return this.reviewService.findReviews(user);
  }
}
