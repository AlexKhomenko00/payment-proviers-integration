import {
  DynamicModule,
  FactoryProvider,
  Logger,
  Module,
  Provider,
  Scope,
} from '@nestjs/common';
import { PayPalModuleRegisterOptions } from './interface/paypal-module-options.interface';

import { AxiosInstance } from 'axios';
import { PayPalAxiosFactory } from './paypal-axios.factory';
import { PayPalSubscriptionService } from './paypal-subscription.service';
import {
  PAYPAL_AXIOS_INSTANCE_TOKEN,
  PAYPAL_LOGGER_TOKEN,
  PAYPAL_MODULE_OPTIONS,
} from './paypal.constants';
import { PayPalService } from './paypal.service';

@Module({})
export class PayPalModule {
  static register(options: PayPalModuleRegisterOptions): DynamicModule {
    const optionsProvider = this.createRegisterOptionsProvider(options);
    const axiosProvider = this.createPayPalAxiosProvider();

    return {
      module: PayPalModule,
      imports: options.imports,
      providers: [
        optionsProvider,
        axiosProvider,
        PayPalAxiosFactory,
        PayPalService,
        PayPalSubscriptionService,
        {
          provide: PAYPAL_LOGGER_TOKEN,
          useClass: Logger,
        },
      ],
      exports: [PayPalService, PayPalSubscriptionService],
    };
  }

  private static createRegisterOptionsProvider(
    options: PayPalModuleRegisterOptions,
  ): Provider {
    return {
      provide: PAYPAL_MODULE_OPTIONS,
      useFactory: (...args: any[]) => options.useFactory(...args),
      inject: options.inject || [],
    };
  }

  private static createPayPalAxiosProvider(): FactoryProvider<AxiosInstance> {
    return {
      provide: PAYPAL_AXIOS_INSTANCE_TOKEN,
      useFactory: (axiosFactory: PayPalAxiosFactory) => {
        const axiosInstance = axiosFactory.instance;

        return axiosInstance;
      },
      scope: Scope.TRANSIENT,
      inject: [PayPalAxiosFactory],
    };
  }
}
