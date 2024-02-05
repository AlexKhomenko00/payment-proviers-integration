import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { stripeConfig } from '../config/stripe.config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;
  constructor(
    @Inject(stripeConfig.KEY)
    private readonly config: ConfigType<typeof stripeConfig>,
  ) {
    this.stripe = new Stripe(this.config.secret, { apiVersion: '2023-10-16' });
  }

  async createCustomer(
    CreateStripeCustomerPayload: CreateStripeCustomerPayload,
  ): Promise<Pick<Stripe.Customer, 'id'>> {
    const customer = await this.stripe.customers.create(
      CreateStripeCustomerPayload,
    );

    return {
      id: customer.id,
    };
  }

  async charge(payload: StripePaymentIntentPayload) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      ...payload,
      currency: this.config.currency,
      confirm: true,
    });

    return {
      id: paymentIntent.id,
      status: paymentIntent.status,
      secret: paymentIntent.client_secret,
    };
  }

  async attachCardToCustomer(payload: CreditCardPayload) {
    await this.stripe.setupIntents.create({
      customer: payload.customerId,
      payment_method: payload.paymentMethodId,
    });

    return {
      id: payload.paymentMethodId,
    };
  }

  async setupDefaultCardForCustomer(payload: CreditCardPayload): Promise<void> {
    await this.stripe.customers.update(payload.customerId, {
      invoice_settings: {
        default_payment_method: payload.paymentMethodId,
      },
    });
  }

  async createSubscription(payload: SubscriptionPayload) {
    const subscription = await this.stripe.subscriptions.create({
      customer: payload.customerId,
      items: [{ price: payload.priceId }],
    });

    return {
      id: subscription.id,
      status: subscription.status,
      clientSecret: subscription.latest_invoice,
    };
  }

  public async listSubscriptions(payload: SubscriptionPayload) {
    return this.stripe.subscriptions.list({
      customer: payload.customerId,
      price: payload.priceId,
    });
  }
}

interface SubscriptionPayload {
  customerId: string;
  priceId: string;
}

interface CreditCardPayload {
  customerId: string;
  paymentMethodId: string;
}

interface CreateStripeCustomerPayload {
  name: string;
  email: string;
}

interface StripePaymentIntentPayload {
  amount: number;
  customerId: string;
  paymentMethodId: string;
}
