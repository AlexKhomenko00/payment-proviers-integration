import { IsString } from 'class-validator';

export class SubscriptionDto {
  @IsString()
  customerId: string;
}
