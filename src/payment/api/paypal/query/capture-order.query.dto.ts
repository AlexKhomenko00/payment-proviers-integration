import { IsString } from 'class-validator';

export class PayPalCaptureOrderQueryDto {
  @IsString()
  token: string;
}
