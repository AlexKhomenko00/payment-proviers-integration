import Stripe from 'stripe';
import { createMockedStripeResponse } from './stripe-response.mock';

export const stripeCreateCustomerResponseMock: Stripe.Response<Stripe.Customer> =
  createMockedStripeResponse({
    id: 'cus_NffrFeUfNV2Hib',
    object: 'customer',
    address: null,
    balance: 0,
    created: 1680893993,
    currency: null,
    default_source: null,
    delinquent: false,
    description: null,
    discount: null,
    email: 'jennyrosen@example.com',
    invoice_prefix: '0759376C',
    invoice_settings: {
      custom_fields: null,
      default_payment_method: null,
      footer: null,
      rendering_options: null,
    },
    livemode: false,
    metadata: {},
    name: 'Jenny Rosen',
    next_invoice_sequence: 1,
    phone: null,
    preferred_locales: [],
    shipping: null,
    tax_exempt: 'none',
    test_clock: null,
  });
