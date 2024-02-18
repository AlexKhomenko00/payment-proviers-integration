export interface PayPalSubscription {
  id: string;
  status: string;
  status_update_time: string;
  plan_id: string;
  plan_overridden: boolean;
  start_time: string;
  quantity: string;
  shipping_amount: ShippingAmount;
  subscriber: Subscriber;
  create_time: string;
  links: Link[];
}

export interface ShippingAmount {
  currency_code: string;
  value: string;
}

export interface Subscriber {
  name: Name;
  email_address: string;
  payer_id: string;
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

export interface Link {
  href: string;
  rel: string;
  method: string;
}
