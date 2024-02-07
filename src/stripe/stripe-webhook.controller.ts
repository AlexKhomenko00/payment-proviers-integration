import {
  Controller,
  Headers,
  Logger,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { StripeService } from './stripe.service';

@Controller('stripe-webhook')
export class StripeWebhookController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly logger: Logger,
  ) {}

  @Post()
  async handleEvent(
    @Headers('stripe-signature') signature: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    const event = await this.stripeService.constructWebhookEvent(
      signature,
      req.rawBody,
    );
    this.logger.log('Stripe webhook event received', event.type);
    //   Other logic on event
  }
}
