import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeCreditCardController } from './stripe-credit-card.controller';
import { StripeSubscriptionController } from './subscription/stripe-subscription.controller';
import { StripeSubscriptionService } from './subscription/stripe-subscription.service';

@Module({
  imports: [],
  providers: [StripeService, StripeSubscriptionService],
  controllers: [StripeCreditCardController, StripeSubscriptionController],
})
export class StripeModule {}
