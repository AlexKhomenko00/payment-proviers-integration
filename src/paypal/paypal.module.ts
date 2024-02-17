import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PayPalModuleRegisterOptions } from './interface/paypal-module-options.interface';
import { PAYPAL_MODULE_OPTIONS } from './paypal.constants';
import { PayPalService } from './paypal.service';

@Module({})
export class PayPalModule {
  static register(options: PayPalModuleRegisterOptions): DynamicModule {
    const optionsProvider = this.createRegisterOptionsProvider(options);

    return {
      module: PayPalModule,
      imports: options.imports,
      providers: [optionsProvider, PayPalService],
      exports: [PayPalService],
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
}
