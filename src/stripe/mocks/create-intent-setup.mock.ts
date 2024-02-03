import Stripe from 'stripe';
import { createMockedStripeResponse } from './stripe-response.mock';

export const createIntentSetupMock =
  createMockedStripeResponse<Stripe.SetupIntent>({
    id: 'seti_1Mm8s8LkdIwHu7ix0OXBfTRG',
    object: 'setup_intent',
    application: null,
    cancellation_reason: null,
    client_secret:
      'seti_1Mm8s8LkdIwHu7ix0OXBfTRG_secret_NXDICkPqPeiBTAFqWmkbff09lRmSVXe',
    created: 1678942624,
    customer: null,
    description: null,
    flow_directions: null,
    last_setup_error: null,
    latest_attempt: null,
    livemode: false,
    mandate: null,
    metadata: {},
    next_action: null,
    automatic_payment_methods: null,
    payment_method_configuration_details: {
      id: 'pm_1Mm8s8LkdIwHu7ix0OXBfTRG',
      parent: 'seti_1Mm8s8LkdIwHu7ix0OXBfTRG',
    },
    on_behalf_of: null,
    payment_method: null,
    payment_method_options: {
      card: {
        mandate_options: null,
        network: null,
        request_three_d_secure: 'automatic',
      },
    },
    payment_method_types: ['card'],
    single_use_mandate: null,
    status: 'requires_payment_method',
    usage: 'off_session',
  });
