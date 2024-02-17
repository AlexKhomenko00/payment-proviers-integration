import { PayPalPaymentIntent } from '../enum/paypal-payment-intent.enum';
import { PayPalOrderStatus } from '../enum/paypal-order-status.enum';
import { PayPalOrderLink } from './paypal-order-link.interface';
import { PayPalPaymentSource } from './paypal-payment-source.interface';
import { PayPalPurchaseUnit } from './paypal-purchase_unit.interface';

export interface PayPalOrder {
  id: string;

  intent: PayPalPaymentIntent;

  purchase_units: PayPalPurchaseUnit[];

  payment_source: PayPalPaymentSource;

  status: PayPalOrderStatus;

  links: PayPalOrderLink[];
}
