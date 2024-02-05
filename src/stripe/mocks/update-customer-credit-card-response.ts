import { stripeCreateCustomerResponseMock } from './create-customer-response';

export const stripeUpdateCustomerCreditCardMockResponse = {
  ...stripeCreateCustomerResponseMock,
  invoice_settings: {
    ...stripeCreateCustomerResponseMock.invoice_settings,
    default_payment_method: 'pm_1J3y3e2eZvKYlo2C5zv3z3z3',
  },
};
