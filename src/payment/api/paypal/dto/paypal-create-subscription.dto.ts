import { Transform } from 'class-transformer';
import { IsDateString, IsNumberString, IsOptional } from 'class-validator';

export class CreatePayPalSubscriptionDto {
  @IsDateString()
  @IsOptional()
  @Transform(({ value }) => new Date(value).toISOString())
  start_time: string = new Date().toISOString();

  @IsNumberString()
  @IsOptional()
  quantity: string;
}
