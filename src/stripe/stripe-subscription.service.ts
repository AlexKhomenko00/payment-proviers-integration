import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StripeOptions } from './interfaces/stripe-config.interface';
import { STRIPE_MODULE_OPTIONS } from './stripe.constants';
import { StripeService } from './stripe.service';

@Injectable()
export class StripeSubscriptionService {
  constructor(
    private readonly stripeService: StripeService,
    @Inject(STRIPE_MODULE_OPTIONS)
    private readonly options: StripeOptions,
  ) {}

  public async createMonthlySubscription(customerId: string) {
    const priceId = this.options.config.subscriptionPriceId;

    const subscriptions = await this.stripeService.listSubscriptions({
      priceId,
      customerId,
    });
    if (subscriptions.data.length) {
      throw new BadRequestException('Customer already subscribed');
    }
    return this.stripeService.createSubscription({ priceId, customerId });
  }

  public async getMonthlySubscription(customerId: string) {
    const priceId = this.options.config.subscriptionPriceId;
    const subscriptions = await this.stripeService.listSubscriptions({
      priceId,
      customerId,
    });

    if (!subscriptions.data.length) {
      return new NotFoundException('Customer not subscribed');
    }
    return subscriptions.data[0];
  }
}
