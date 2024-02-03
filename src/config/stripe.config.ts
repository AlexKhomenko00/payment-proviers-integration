import { registerAs } from '@nestjs/config';

interface StripeConfig {
  secret: string;
  currency: string;
}

export const stripeConfig = registerAs<StripeConfig>('stripe', () => ({
  secret: process.env.STRIPE_SECRET_KEY,
  currency: process.env.STRIPE_CURRENCY,
}));
