import EventEmitter from 'events';
import { DomainEvent, DomainEventSubscriber, EventBus } from '../../../domain/core/DomainEvent';
import { DomainEventDeserializer } from '../DomainEventDeserializer';
import { DomainEventSerializer } from '../DomainEventSerializer';

export class InMemoryEventBus implements EventBus {
  private channel: EventEmitter;
  private deserializer?: DomainEventDeserializer;
  constructor() {
    this.channel = new EventEmitter();
  }

  async configure(subscribers: DomainEventSubscriber[]): Promise<void> {
    subscribers.map((sub) => console.log(sub.constructor.name));
  }

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      try {
        this.channel.emit(event.eventName, DomainEventSerializer.serialize(event));
      } catch (error) {
        console.log(error);
      }
    }
  }

  addSubscribers(subscribers: DomainEventSubscriber[]): void {
    if (!subscribers) return;
    this.deserializer = DomainEventDeserializer.configure(subscribers);
    subscribers.map((subscriber) => this.registerSubscriber(subscriber));
  }

  public registerSubscriber(subscriber: DomainEventSubscriber) {
    subscriber.subscribedTo().map((event) => {
      this.channel.on(event.EVENT_NAME, (msg: string) => {
        subscriber.on(this.deserializer!.deserialize(msg));
      });
    });
  }
}
