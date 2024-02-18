# NestJS Payment Providers

## Description
This project facilitates the integration of multiple payment providers into your application, with initial support for PayPal and Stripe. Designed for ease of use and flexibility, it enables seamless payment processing for a variety of payment methods, including subscriptions and one-time payments.

## Features
- Seamless integration with PayPal and Stripe.
- Support for both one-time payments and subscriptions.
- Customizable configurations for each payment provider.
- Webhook support for managing asynchronous payment events.

## Installation
```bash
npm ci
```

## Usage
Import necessary modules from the payment directory and configure each payment provider using templates in the config directory (```paypal.config.ts``` and ```stripe.config.ts```).

## Start
```bash
npm run start
```

## PayPal Integration
- Configure PayPal credentials in ```paypal.config.ts```.
- Utilize ```PaypalController``` for payment handling and ```PaypalSubscriptionController``` for managing subscriptions.

## Stripe Integration
- Configure Stripe credentials in stripe.config.ts.
- Use ```StripeCreditCardController``` for credit card transactions, ```StripeSubscriptionController``` for subscriptions, and ```StripeWebhookController``` for handling webhook events.
