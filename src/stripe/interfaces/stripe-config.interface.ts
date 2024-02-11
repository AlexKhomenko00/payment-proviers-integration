import { ModuleMetadata } from '@nestjs/common';

export interface StripeConfig {
  secret: string;
  currency: string;
  subscriptionPriceId: string;
  webhookSecret: string;
}

export interface StripeOptions {
  config: StripeConfig;
}

export interface StripeModuleRegisterOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory(...args: any[]): Promise<StripeOptions> | StripeOptions;
  inject?: any[];
}
