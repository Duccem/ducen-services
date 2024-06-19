import { Stripe } from 'stripe';

export class StripePaymentProvider {
  private client: Stripe;
  public static allowedEvents = new Map([
    ['checkout.session.completed', 'SuccessSession'],
    ['checkout.session.expired', 'FailSession'],
  ]);
  constructor(
    secretKey: string,
    private baseUrl: string,
  ) {
    this.client = new Stripe(secretKey, { apiVersion: '2023-10-16' });
  }
  async createSession(
    amount: number,
    quantity: number,
    serviceName: string,
  ): Promise<{ sessionId: string; url: string }> {
    const session = await this.client.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: serviceName,
            },
            unit_amount: amount,
          },
          quantity: quantity,
        },
      ],
      success_url: `${this.baseUrl}/auth/completed?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${this.baseUrl}/auth/choose-plan?session_id={CHECKOUT_SESSION_ID}`,
    });

    return {
      sessionId: session.id,
      url: session.url,
    };
  }
}
