import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderService } from 'src/order/order.service';
import { ProductService } from 'src/product/product.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    private orderService: OrderService,
    private userService: UserService,
    private productService: ProductService,
  ) {}

  async createReview(currentUser) {
    const user = await this.userService.findByUsername(currentUser.username);
    const order = await this.orderService.findOrder(currentUser);
    for (let item of order.items) {
      const review = this.reviewRepository.create();
      Object.assign(review, {
        product: item.product,
        quantity: item.quantity,
        price: item.product.price * item.quantity,
        user,
      });
      await this.reviewRepository.save(review);
      await this.productService.updateQuantityAndSold(item.product, item);
    }
    await this.orderService.remove(order);
    return 'Done';
  }

  async findReviews(currentUser) {
    const reviews = await this.reviewRepository.find({
      where: {
        user: { username: currentUser.username },
      },
      relations: ['user', 'product'],
    });

    for (let review of reviews) {
      delete review.user.password;
    }
    return reviews;
  }
}
