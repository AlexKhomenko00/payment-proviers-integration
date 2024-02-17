import { Body, Get, Post } from '@nestjs/common';
import { StripeSubscriptionService } from 'src/stripe';
import { SubscriptionDto } from './dto/subscription.dto';
import { PaymentControllerController } from '../../payment.controller.decorator';

@PaymentControllerController('stripe/subscriptions')
export class StripeSubscriptionController {
  constructor(
    private readonly subscriptionsService: StripeSubscriptionService,
  ) {}

  @Post('monthly')
  async createMonthlySubscription(@Body() dto: SubscriptionDto) {
    return this.subscriptionsService.createMonthlySubscription(dto.customerId);
  }

  @Get('monthly')
  async getMonthlySubscription(@Body() dto: SubscriptionDto) {
    return this.subscriptionsService.getMonthlySubscription(dto.customerId);
  }
}
