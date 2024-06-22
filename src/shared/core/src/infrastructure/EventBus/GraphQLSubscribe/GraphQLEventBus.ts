import { PubSub } from 'graphql-subscriptions';
import { DomainEvent, EventBus } from '../../../domain/core/DomainEvent';

export class GraphQLEventBus implements EventBus {
  private pubsub: PubSub;
  constructor() {
    this.pubsub = new PubSub();
  }

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      try {
        await this.pubsub.publish(event.eventName, event.aggregate);
      } catch (error) {
        console.log(error);
      }
    }
  }

  addSubscribers(name: string): AsyncIterator<any> {
    return this.pubsub.asyncIterator(name);
  }
}
