/**
 * PayPal Order Status
 * @readonly
 * @enum {string}
 */
export enum PayPalOrderStatus {
  /**  The order was created with the specified context. */
  CREATED = 'CREATED',

  /** The order was saved and persisted.*/
  SAVED = 'SAVED',

  /** The customer approved the payment through the PayPal wallet or another form of guest or unbranded payment.
   * For example, a card, bank account, or so on. */
  APPROVED = 'APPROVED',

  /** All purchase units in the order are voided.*/
  VOIDED = 'VOIDED',

  /** The payment was authorized or the authorized payment was captured for the order.*/
  COMPLETED = 'COMPLETED',

  /** The order requires an action from the payer (e.g. 3DS authentication).
   * Redirect the payer to the "rel":"payer-action" HATEOAS link returned as part of the response prior to authorizing or capturing the order.*/
  PAYER_ACTION_REQUIRED = 'PAYER_ACTION_REQUIRED',
}
