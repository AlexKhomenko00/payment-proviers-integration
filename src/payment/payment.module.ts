import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { paypalConfig } from 'src/config/paypal.config';
import { stripeConfig } from 'src/config/stripe.config';
import { PayPalModule } from 'src/paypal';
import { StripeModule } from 'src/stripe';
import { PayPalController } from './api/paypal/paypal.controller';
import { StripeCreditCardController } from './api/stripe/stripe-credit-card.controller';
import { StripeSubscriptionController } from './api/stripe/stripe-subscription.controller';
import { StripeWebhookController } from './api/stripe/stripe-webhook.controller';
import { PayPalSubscriptionController } from './api/paypal/paypal-subscription.contoller';

@Module({
  imports: [
    StripeModule.register({
      useFactory: (config) => ({
        config,
      }),
      inject: [stripeConfig.KEY],
    }),
    PayPalModule.register({
      useFactory: (config: ConfigType<typeof paypalConfig>) => config,
      inject: [paypalConfig.KEY],
    }),
  ],
  controllers: [
    StripeCreditCardController,
    StripeSubscriptionController,
    StripeWebhookController,
    PayPalController,
    PayPalSubscriptionController,
  ],
})
export class PaymentModule {}
