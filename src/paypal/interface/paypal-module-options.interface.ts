import { ModuleMetadata } from '@nestjs/common';

export interface PayPalModuleConfig {
  clientId: string;
  clientSecret: string;
  monthlyPlanId: string;
  currency: string;
  environment: 'sandbox' | 'live';
  returnUrl: string;
  cancelUrl: string;
}

export interface PayPalModuleRegisterOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory(...args: any[]): Promise<PayPalModuleConfig> | PayPalModuleConfig;
  inject?: any[];
}
