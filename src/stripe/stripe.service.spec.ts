import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { stripeConfig } from '../config/stripe.config';
import { stripeCreateCustomerResponseMock } from './mocks/create-customer-response';
import { stripeCreatePaymentIntentResponseMock } from './mocks/create-payment-intent-response.mock';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';

describe('StripeService', () => {
  let service: StripeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          load: [stripeConfig],
        }),
      ],
      providers: [StripeService],
    }).compile();

    service = module.get<StripeService>(StripeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create customer when provided name and email', async () => {
    const customer = await service.createCustomer({
      name: stripeCreateCustomerResponseMock.name,
      email: stripeCreateCustomerResponseMock.email,
    });

    expect(customer).toEqual({
      id: stripeCreateCustomerResponseMock.id,
    });
  });

  it('should create payment intent when provided amount and currency', async () => {
    const paymentIntent = await service.charge({
      amount: 2000,
      customerId: stripeCreatePaymentIntentResponseMock.customer?.toString(),
      paymentMethodId:
        stripeCreatePaymentIntentResponseMock
          .payment_method_configuration_details.id,
    });

    expect(paymentIntent).toEqual({
      id: stripeCreatePaymentIntentResponseMock.id,
      status: stripeCreatePaymentIntentResponseMock.status,
      secret: stripeCreatePaymentIntentResponseMock.client_secret,
    });
  });

  it('should attach credit card to customer', async () => {
    const paymentMethod = await service.attachCardToCustomer({
      customerId: 'cus_123',
      paymentMethodId: 'pm_123',
    });

    expect(paymentMethod).toEqual({
      id: 'pm_123',
    });
  });
});

jest.mock('stripe', () => ({
  default: jest.fn().mockImplementation(
    () =>
      ({
        customers: {
          create: jest.fn().mockResolvedValue(stripeCreateCustomerResponseMock),
        },
        paymentIntents: {
          create: jest
            .fn()
            .mockResolvedValue(stripeCreatePaymentIntentResponseMock),
        },
        setupIntents: {
          create: jest
            .fn()
            .mockResolvedValue(stripeCreatePaymentIntentResponseMock),
        },
      }) as Record<keyof Stripe, any>,
  ),
}));
