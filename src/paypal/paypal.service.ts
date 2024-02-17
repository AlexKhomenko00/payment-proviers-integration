import { Inject, Injectable, Logger } from '@nestjs/common';
import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import { PayPalPaymentIntent } from './enum/paypal-payment-intent.enum';
import { PayPalCreatePaymentPayload } from './interface/paypal-create-payment-payload.interface';
import { PayPalModuleConfig } from './interface/paypal-module-options.interface';
import { PayPalOrder } from './interface/paypal-order.interface';
import { PAYPAL_MODULE_OPTIONS } from './paypal.constants';

@Injectable()
export class PayPalService {
  private readonly axiosInstance: Axios;
  private readonly logger: Logger = new Logger(PayPalService.name);

  constructor(
    @Inject(PAYPAL_MODULE_OPTIONS)
    private readonly paypalOptions: PayPalModuleConfig,
  ) {
    this.axiosInstance = axios.create({
      baseURL: this.getBaseUrl(paypalOptions.environment),
      headers: { 'Content-Type': 'application/json' },
    });
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        this.logger.error(error.message);
        return Promise.reject(error);
      },
    );
  }

  public async createAutoCapturedPayment(payload: PayPalCreatePaymentPayload) {
    const accessToken = await this.getAccessToken();

    const orderDetails = this.buildOrderDetails(
      payload,
      PayPalPaymentIntent.CAPTURE,
    );

    const paymentResponse = await this.axiosInstance.post<
      any,
      AxiosResponse<PayPalOrder>
    >('/v2/checkout/orders', orderDetails, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return paymentResponse.data;
  }

  public async createAuthorizedPayment(payload: PayPalCreatePaymentPayload) {
    const accessToken = await this.getAccessToken();
    const orderDetails = this.buildOrderDetails(
      payload,
      PayPalPaymentIntent.AUTHORIZE,
    );
    const paymentResponse = await this.axiosInstance.post<
      any,
      AxiosResponse<PayPalOrder>
    >('/v2/checkout/orders', orderDetails, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return paymentResponse.data;
  }

  public async capturePayment(orderId: string) {
    const accessToken = await this.getAccessToken();
    const captureResponse = await this.axiosInstance.post<
      any,
      AxiosResponse<PayPalOrder>
    >(
      `/v2/checkout/orders/${orderId}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

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

  private async getAccessToken() {
    try {
      const authResponse = await axios.post(
        `${this.getBaseUrl(this.paypalOptions.environment)}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: this.paypalOptions.clientId,
            password: this.paypalOptions.clientSecret,
          },
        },
      );

      return authResponse.data.access_token;
    } catch (e) {
      this.logger.error({
        message: 'Failed to get PayPal access token',
        error: e,
      });
      throw e;
    }
  }

  private getBaseUrl(environment: PayPalModuleConfig['environment']) {
    return environment === 'sandbox'
      ? 'https://api.sandbox.paypal.com'
      : 'https://api.paypal.com';
  }
}
