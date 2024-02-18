import { Inject, Injectable, Logger } from '@nestjs/common';
import { AxiosInstance, AxiosResponse } from 'axios';
import { CreateSubscriptionPayload } from './interface/create-subscription-payload.interface';
import { PayPalModuleConfig } from './interface/paypal-module-options.interface';
import { PayPalSubscription } from './interface/paypal-subscription.interface';
import {
  PAYPAL_AXIOS_INSTANCE_TOKEN,
  PAYPAL_MODULE_OPTIONS,
} from './paypal.constants';

@Injectable()
export class PayPalSubscriptionService {
  private readonly logger: Logger = new Logger(PayPalSubscriptionService.name);

  constructor(
    @Inject(PAYPAL_MODULE_OPTIONS)
    private readonly paypalOptions: PayPalModuleConfig,
    @Inject(PAYPAL_AXIOS_INSTANCE_TOKEN)
    private readonly axiosInstance: AxiosInstance,
  ) {}

  async createMonthlySubscription(
    payload: Omit<CreateSubscriptionPayload, 'plan_id'>,
  ): Promise<any> {
    const subscription = await this.createSubscription({
      ...payload,
      plan_id: this.paypalOptions.monthlyPlanId,
    });

    return subscription;
  }

  async createSubscription(
    payload: CreateSubscriptionPayload,
  ): Promise<PayPalSubscription> {
    const url = `/v1/billing/subscriptions`;

    try {
      const response = await this.axiosInstance.post<
        typeof payload,
        AxiosResponse<PayPalSubscription>
      >(url, payload);

      return response.data;
    } catch (error) {
      this.logger.error(
        'Failed to create PayPal subscription. ' + error.message,
      );
      throw error;
    }
  }
}
