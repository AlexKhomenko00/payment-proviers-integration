import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeCreditCardController } from './stripe-credit-card.controller';

@Module({
  imports: [],
  providers: [StripeService],
  controllers: [StripeCreditCardController],
})
export class StripeModule {}
