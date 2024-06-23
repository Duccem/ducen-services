import { DomainEvent, DomainEventSubscriber, EventBus } from '../../../domain/core/DomainEvent';

export class InMemoryEventBus implements EventBus {
  private readonly subscriptions: Map<string, Function[]> = new Map();

  async publish(events: DomainEvent[]): Promise<void> {
    const executions: unknown[] = [];
    for (const event of events) {
      const subscribers = this.subscriptions.get(event.eventName);
      if (subscribers) {
        subscribers.forEach((subscriber) => {
          executions.push(subscriber(event));
        });
      }
    }
    await Promise.all(executions).catch((error) => {
      console.error('Executing subscriptions:', error);
    });
  }

  registerSubscribers(subscribers: DomainEventSubscriber[]): void {
    subscribers.map((subscriber) => {
      subscriber.subscribedTo().map((event) => this.subscribe(event.EVENT_NAME, subscriber));
    });
  }

  registerSubscriber(subscriber: DomainEventSubscriber): void {
    subscriber.subscribedTo().map((event) => this.subscribe(event.EVENT_NAME, subscriber));
  }

  private subscribe(eventName: string, subscriber: DomainEventSubscriber) {
    const currentSubscriptions = this.subscriptions.get(eventName);
    const subscription = subscriber.on.bind(subscriber);

    if (currentSubscriptions) {
      currentSubscriptions.push(subscription);
    } else {
      this.subscriptions.set(eventName, [subscription]);
    }
  }
}
