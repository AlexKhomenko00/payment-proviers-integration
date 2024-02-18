export interface CreateSubscriptionPayload {
  plan_id: string;
  start_time?: string;
  quantity?: string;
  shipping_amount?: ShippingAmount;
  subscriber?: Subscriber;
  application_context?: ApplicationContext;
}

export interface ShippingAmount {
  currency_code: string;
  value: string;
}

export interface Subscriber {
  name: Name;
  email_address: string;
  shipping_address: ShippingAddress;
}

export interface Name {
  given_name: string;
  surname: string;
}

export interface ShippingAddress {
  name: Name2;
  address: Address;
}

export interface Name2 {
  full_name: string;
}

export interface Address {
  address_line_1: string;
  address_line_2: string;
  admin_area_2: string;
  admin_area_1: string;
  postal_code: string;
  country_code: string;
}

export interface ApplicationContext {
  brand_name: string;
  locale: string;
  shipping_preference: string;
  user_action: string;
  payment_method: PaymentMethod;
  return_url: string;
  cancel_url: string;
}

export interface PaymentMethod {
  payer_selected: string;
  payee_preferred: string;
}
