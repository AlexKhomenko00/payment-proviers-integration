import { Module } from '@nestjs/common';
import { stripeConfig } from 'src/config/stripe.config';
import { StripeModule } from 'src/stripe';
import { StripeCreditCardController } from './api/stripe-credit-card.controller';
import { StripeSubscriptionController } from './api/stripe-subscription.controller';
import { StripeWebhookController } from './api/stripe-webhook.controller';

@Module({
  imports: [
    StripeModule.register({
      useFactory: (config) => ({
        config,
      }),
      inject: [stripeConfig.KEY],
    }),
  ],
  controllers: [
    StripeCreditCardController,
    StripeSubscriptionController,
    StripeWebhookController,
  ],
})
export class PaymentModule {}
