import { Controller, ControllerOptions, applyDecorators } from '@nestjs/common';
import { PAYMENT_CONTROLLER_PREFIX } from './payment.constants';

export function PaymentControllerController(prefix: string): ClassDecorator {
  const controllerOptions: ControllerOptions = {
    path: `${PAYMENT_CONTROLLER_PREFIX}/${prefix}`,
  };

  return applyDecorators(Controller(controllerOptions));
}
