import { DynamicModule, Module, Provider } from '@nestjs/common';
import { StripeModuleRegisterOptions } from './interfaces/stripe-config.interface';
import { STRIPE_MODULE_OPTIONS } from './stripe.constants';
import { StripeService } from './stripe.service';
import { StripeSubscriptionService } from './stripe-subscription.service';

@Module({})
export class StripeModule {
  static register(options: StripeModuleRegisterOptions): DynamicModule {
    const optionsProvider = this.createRegisterOptionsProvider(options);

    return {
      module: StripeModule,
      imports: options.imports,
      providers: [StripeService, StripeSubscriptionService, optionsProvider],
      exports: [StripeService, StripeSubscriptionService],
    };
  }

  private static createRegisterOptionsProvider(
    options: StripeModuleRegisterOptions,
  ): Provider {
    return {
      provide: STRIPE_MODULE_OPTIONS,
      useFactory: async (...args: any[]) => {
        const config = await options.useFactory(...args);
        return { config };
      },
      inject: options.inject || [],
    };
  }
}
