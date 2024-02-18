import { Body, Get, Post, Query } from '@nestjs/common';
import { PaymentController } from 'src/payment/payment.controller.decorator';
import { PayPalService } from 'src/paypal';
import { PayPalPaymentDto } from './dto/paypal-payment.dto';
import { PayPalCaptureOrderQueryDto } from './query/capture-order.query.dto';

@PaymentController('paypal')
export class PayPalController {
  constructor(private readonly paypalService: PayPalService) {}

  @Post('/create')
  async createCheckout(@Body() dto: PayPalPaymentDto) {
    return this.paypalService.createAutoCapturedPayment(dto);
  }

  @Get('/capture')
  async capturePayment(@Query() dto: PayPalCaptureOrderQueryDto) {
    return this.paypalService.capturePayment(dto.token);
  }
}
