import { InternalError } from '@ducen/core';
import { Stripe } from 'stripe';

export class StripePaymentProvider {
  private client: Stripe;
  public static allowedEvents = new Map([
    ['checkout.session.completed', 'SuccessSession'],
    ['checkout.session.expired', 'FailSession'],
  ]);
  constructor(secretKey: string, private baseUrl: string) {
    this.client = new Stripe(secretKey, { apiVersion: '2023-10-16' });
  }
  async createSession(plan: string, period: string): Promise<{ sessionId: string; url: string }> {
    const prices = await this.client.prices.search({
      query: `metadata["plan"]: "${plan}" AND metadata["period"]: "${period}"`,
    });
    if (prices.data.length === 0) throw new InternalError('Plan not found');
    const session = await this.client.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: prices.data[0].id,
          quantity: 1,
        },
      ],
      success_url: `${this.baseUrl}/auth/completed`,
      cancel_url: `${this.baseUrl}/auth/choose-plan`,
    });

    return {
      sessionId: session.id,
      url: session.url,
    };
  }
}
