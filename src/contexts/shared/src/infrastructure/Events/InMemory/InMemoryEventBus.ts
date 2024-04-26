import EventEmitter from 'events';
import { DomainEventDeserializer } from '../DomainEventDeserializer';
import { DomainEventFailOverPublisher } from '../DomainEventFailOverPublisher';
import { DomainEventSerializer } from '../DomainEventSerializer';
import { DomainEvent } from '../../../domain/DomainEvent';
import { EventBus } from '../../../domain/DomainEventBus';
import { DomainEventSubscriber } from '../../../domain/DomainEventSubscriber';

export class InMemoryEventBus implements EventBus {
  private channel: EventEmitter;
  private deserializer?: DomainEventDeserializer;
  constructor(private failOverPublisher: DomainEventFailOverPublisher) {
    this.channel = new EventEmitter();
  }

  async configure(subscribers: DomainEventSubscriber[]): Promise<void> {
    subscribers.map((sub) => console.log(sub.constructor.name));
  }

  async publish(events: DomainEvent[]): Promise<void> {
    for (const event of events) {
      try {
        this.channel.emit(event.eventName, DomainEventSerializer.serialize(event));
        await this.failOverPublisher.publish(event, true);
      } catch (error) {
        await this.failOverPublisher.publish(event, false);
      }
    }
  }

  addSubscribers(subscribers: DomainEventSubscriber[]): void {
    if (!subscribers) return;
    this.deserializer = DomainEventDeserializer.configure(subscribers);
    this.failOverPublisher.setDeserializer(this.deserializer);
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
