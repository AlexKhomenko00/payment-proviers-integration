import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { stripeConfig } from './config/stripe.config';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [stripeConfig],
    }),
    StripeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
