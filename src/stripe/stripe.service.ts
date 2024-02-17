import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { StripeOptions } from './interfaces/stripe-module-options.interface';
import { CreateStripeCustomerPayload } from './interfaces/stripe-create-customer-payload.interface';
import { CreditCardPayload } from './interfaces/stripe-credit-card-payload.interface';
import { StripePaymentIntentPayload } from './interfaces/stripe-payment-intent.interface';
import { SubscriptionPayload } from './interfaces/stripe-subscription-payload.interface';
import { STRIPE_MODULE_OPTIONS } from './stripe.constants';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;
  constructor(
    @Inject(STRIPE_MODULE_OPTIONS)
    private readonly options: StripeOptions,
  ) {
    this.stripe = new Stripe(this.options.config.secret, {
      apiVersion: '2023-10-16',
    });
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
      currency: this.options.config.currency,
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

  public async constructWebhookEvent(signature: string, payload: Buffer) {
    const webhookSecret = this.options.config.webhookSecret;

    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret,
    );
  }
}
