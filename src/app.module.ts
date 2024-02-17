import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { stripeConfig } from 'src/config/stripe.config';
import { PaymentModule } from './payment/payment.module';
import { paypalConfig } from './config/paypal.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [stripeConfig, paypalConfig],
    }),
    PaymentModule,
  ],
})
export class AppModule {}
