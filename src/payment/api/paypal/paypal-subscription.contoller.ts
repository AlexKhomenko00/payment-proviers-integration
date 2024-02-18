import { Body, Post } from '@nestjs/common';
import { PaymentController } from 'src/payment/payment.controller.decorator';
import { PayPalSubscriptionService } from 'src/paypal';
import { CreateSubscriptionPayload } from 'src/paypal/interface/create-subscription-payload.interface';

@PaymentController('paypal/subscription')
export class PayPalSubscriptionController {
  constructor(
    private readonly payPalSubscriptionService: PayPalSubscriptionService,
  ) {}

  @Post('create')
  async createSubscription(@Body() dto: CreateSubscriptionPayload) {
    return this.payPalSubscriptionService.createMonthlySubscription(dto);
  }
}
