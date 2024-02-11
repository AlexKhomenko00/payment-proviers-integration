import { Headers, Post, RawBodyRequest, Req } from '@nestjs/common';
import { Request } from 'express';
import { StripeService } from 'src/stripe';
import { PaymentControllerController } from '../payment.controller.decorator';

@PaymentControllerController('stripe-webhook')
export class StripeWebhookController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  async handleEvent(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    await this.stripeService.constructWebhookEvent(signature, req.rawBody);
    //   Other logic on event
  }
}
