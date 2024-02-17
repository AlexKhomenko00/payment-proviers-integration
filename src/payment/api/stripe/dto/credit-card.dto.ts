import { IsString } from 'class-validator';

export class StripeCreditCardDto {
  @IsString()
  paymentMethodId: string;

  @IsString()
  stripeCustomerId: string;
}
