import Stripe from 'stripe';

export function createMockedStripeResponse<T>(response: T): Stripe.Response<T> {
  return {
    ...response,
    lastResponse: {
      headers: {},
      requestId: 'req_1',
      statusCode: 200,
    },
  };
}
