import { Inject, Injectable } from '@nestjs/common';
import { AxiosInstance, AxiosResponse } from 'axios';
import { PayPalPaymentIntent } from './enum/paypal-payment-intent.enum';
import { PayPalCreatePaymentPayload } from './interface/paypal-create-payment-payload.interface';
import { PayPalModuleConfig } from './interface/paypal-module-options.interface';
import { PayPalOrder } from './interface/paypal-order.interface';
import {
  PAYPAL_AXIOS_INSTANCE_TOKEN,
  PAYPAL_MODULE_OPTIONS,
} from './paypal.constants';

@Injectable()
export class PayPalService {
  constructor(
    @Inject(PAYPAL_MODULE_OPTIONS)
    private readonly paypalOptions: PayPalModuleConfig,
    @Inject(PAYPAL_AXIOS_INSTANCE_TOKEN)
    private readonly axiosInstance: AxiosInstance,
  ) {}

  public async createAutoCapturedPayment(payload: PayPalCreatePaymentPayload) {
    const orderDetails = this.buildOrderDetails(
      payload,
      PayPalPaymentIntent.CAPTURE,
    );

    const paymentResponse = await this.axiosInstance.post<
      typeof orderDetails,
      AxiosResponse<PayPalOrder>
    >('/v2/checkout/orders', orderDetails);

    return paymentResponse.data;
  }

  public async createAuthorizedPayment(payload: PayPalCreatePaymentPayload) {
    const orderDetails = this.buildOrderDetails(
      payload,
      PayPalPaymentIntent.AUTHORIZE,
    );
    const paymentResponse = await this.axiosInstance.post<
      null,
      AxiosResponse<PayPalOrder>
    >('/v2/checkout/orders', orderDetails);

    return paymentResponse.data;
  }

  public async capturePayment(orderId: string) {
    const captureResponse = await this.axiosInstance.post<
      null,
      AxiosResponse<PayPalOrder>
    >(`/v2/checkout/orders/${orderId}/capture`);

    return captureResponse.data;
  }

  private readonly buildOrderDetails = (
    payload: PayPalCreatePaymentPayload,
    intent: PayPalPaymentIntent,
  ) => {
    return {
      intent,
      purchase_units: [
        {
          amount: {
            currency_code: this.paypalOptions.currency,
            value: payload.amount,
          },
        },
      ],
      application_context: {
        return_url: this.paypalOptions.returnUrl,
        cancel_url: this.paypalOptions.cancelUrl,
      },
    };
  };
}
