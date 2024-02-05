import { Body, Controller, Get, Post } from '@nestjs/common';
import { SubscriptionDto } from '../dto/subscription.dto';
import { StripeSubscriptionService } from './stripe-subscription.service';

@Controller('stripe/subscriptions')
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
