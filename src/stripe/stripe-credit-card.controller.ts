import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AddCreditCardDto } from './dto/add-credit-card.dto';
import { StripeService } from './stripe.service';

@Controller('stripe/credit-card')
export class StripeCreditCardController {
  constructor(private readonly stripeService: StripeService) {}

  @Post()
  async addCreditCard(
    @Body() dto: AddCreditCardDto,
    @Req() request: Request & { user: { stripeCustomerId: string } },
  ) {
    return this.stripeService.attachCardToCustomer({
      customerId: request.user.stripeCustomerId,
      paymentMethodId: dto.paymentMethodId,
    });
  }
}
