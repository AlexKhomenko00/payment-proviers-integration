import { IsNumber } from 'class-validator';

export class PayPalPaymentDto {
  @IsNumber()
  amount: number;
}
