import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeCreditCardController } from './stripe-credit-card.controller';
import { StripeSubscriptionController } from './subscription/stripe-subscription.controller';
import { StripeSubscriptionService } from './subscription/stripe-subscription.service';
import { StripeWebhookController } from './stripe-webhook.controller';

@Module({
  imports: [],
  providers: [StripeService, StripeSubscriptionService],
  controllers: [
    StripeCreditCardController,
    StripeSubscriptionController,
    StripeWebhookController,
  ],
})
export class StripeModule {}
