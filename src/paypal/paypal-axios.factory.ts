import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import axios, { AxiosError, AxiosInstance, isAxiosError } from 'axios';
import { PayPalModuleConfig } from './interface/paypal-module-options.interface';
import { PAYPAL_MODULE_OPTIONS } from './paypal.constants';

@Injectable()
export class PayPalAxiosFactory {
  private readonly logger: Logger = new Logger(PayPalAxiosFactory.name);
  constructor(
    @Inject(PAYPAL_MODULE_OPTIONS)
    private readonly options: PayPalModuleConfig,
  ) {}

  private initializeInterceptors(axiosInstance: AxiosInstance) {
    axiosInstance.interceptors.request.use(async (config) => {
      this.logger.log(`Sending PayPal request: ${config.url}`);

      const accessToken = await this.getAccessToken();
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });

    axiosInstance.interceptors.response.use(
      (response) => {
        this.logger.log(
          `Received response from PayPal: ${response.config.url}`,
        );
        return response;
      },
      (error: AxiosError<{ message: string }>) => {
        const message = error.response?.data?.message || error.message;
        this.logger.error(
          `PayPal request ${error.config.url} failed: ${message}`,
        );

        return Promise.reject(new BadRequestException(message));
      },
    );
  }

  private async getAccessToken() {
    try {
      const authResponse = await axios.post(
        `${this.getBaseUrl(this.options.environment)}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: this.options.clientId,
            password: this.options.clientSecret,
          },
        },
      );

      return authResponse.data.access_token;
    } catch (e) {
      let message = 'Failed to get PayPal Access Token';
      if (isAxiosError(e)) {
        message += e.response?.data?.message || e.message;
      }
      this.logger.error(message);
      throw e;
    }
  }

  private getBaseUrl(environment: PayPalModuleConfig['environment']) {
    return environment === 'sandbox'
      ? 'https://api.sandbox.paypal.com'
      : 'https://api.paypal.com';
  }

  get instance(): AxiosInstance {
    const axiosInstance = axios.create({
      baseURL: this.getBaseUrl(this.options.environment),
      headers: { 'Content-Type': 'application/json' },
    });
    this.initializeInterceptors(axiosInstance);

    return axiosInstance;
  }
}
