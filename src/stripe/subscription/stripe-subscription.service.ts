import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { stripeConfig } from 'src/config/stripe.config';
import { StripeService } from '../stripe.service';

@Injectable()
export class StripeSubscriptionService {
  constructor(
    private readonly stripeService: StripeService,
    @Inject(stripeConfig.KEY)
    private readonly config: ConfigType<typeof stripeConfig>,
  ) {}

  public async createMonthlySubscription(customerId: string) {
    const priceId = this.config.subscriptionPriceId;

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
    const priceId = this.config.subscriptionPriceId;
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
