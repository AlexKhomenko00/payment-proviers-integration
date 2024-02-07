import { registerAs } from '@nestjs/config';

interface StripeConfig {
  secret: string;
  currency: string;
  subscriptionPriceId: string;
  webhookSecret: string;
}

export const stripeConfig = registerAs<StripeConfig>('stripe', () => ({
  secret: process.env.STRIPE_SECRET_KEY,
  currency: process.env.STRIPE_CURRENCY,
  subscriptionPriceId: process.env.STRIPE_MONTHLY_SUBSCRIPTION_PRICE_ID,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
}));
