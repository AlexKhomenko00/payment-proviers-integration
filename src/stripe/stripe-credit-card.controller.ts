import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { StripeCreditCardDto } from './dto/credit-card.dto';
import { StripeService } from './stripe.service';

@Controller('stripe/credit-card')
export class StripeCreditCardController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  async addCreditCard(@Body() dto: StripeCreditCardDto) {
    return this.stripeService.attachCardToCustomer({
      customerId: dto.stripeCustomerId,
      paymentMethodId: dto.paymentMethodId,
    });
  }

  @Post('default')
  @HttpCode(200)
  async setDefaultCard(@Body() dto: StripeCreditCardDto) {
    await this.stripeService.setupDefaultCardForCustomer({
      customerId: dto.stripeCustomerId,
      paymentMethodId: dto.paymentMethodId,
    });
  }
}
