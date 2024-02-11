import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { stripeConfig } from 'src/config/stripe.config';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [stripeConfig],
    }),
    PaymentModule,
  ],
})
export class AppModule {}
