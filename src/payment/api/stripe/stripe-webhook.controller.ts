import { Headers, Logger, Post, RawBodyRequest, Req } from '@nestjs/common';
import { Request } from 'express';
import { StripeService } from 'src/stripe';
import { PaymentControllerController } from '../../payment.controller.decorator';

@PaymentControllerController('stripe-webhook')
export class StripeWebhookController {
  private readonly logger = new Logger(StripeWebhookController.name);

  constructor(private readonly stripeService: StripeService) {}

  @Post()
  async handleEvent(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    await this.stripeService.constructWebhookEvent(signature, req.rawBody);
    this.logger.log('Stripe webhook event received');
    //   Other logic on event
  }
}
