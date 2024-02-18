import { registerAs } from '@nestjs/config';
import { PayPalModuleConfig } from 'src/paypal';

export const paypalConfig = registerAs<PayPalModuleConfig>('paypal', () => ({
  clientId: process.env.PAYPAL_CLIENT_ID,
  clientSecret: process.env.PAYPAL_CLIENT_SECRET,
  currency: process.env.PAYPAL_CURRENCY,
  environment: process.env.PAYPAL_ENVIRONMENT as 'sandbox' | 'live',
  returnUrl: process.env.PAYPAL_RETURN_URL,
  cancelUrl: process.env.PAYPAL_CANCEL_URL,
  monthlyPlanId: process.env.PAYPAL_MONTHLY_PLAN_ID,
}));
