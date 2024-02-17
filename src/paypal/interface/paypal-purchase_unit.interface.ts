export interface PayPalPurchaseUnit {
  referenceId: string;
  amount: {
    currency_code: string;
    value: string;
  };
  payee?: {
    email_address: string;
  };
  description: string;
  custom_id: string;
  soft_descriptor: string;
  items: {
    name: string;
    unit_amount: {
      currency_code: string;
      value: string;
    };
    quantity: string;
  }[];
  shipping: Record<string, unknown>;
}
