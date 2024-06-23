import { DomainEventClass, DomainEventSubscriber } from '../../domain/core/DomainEvent';

type DomainEventJSON = {
  type: string;
  aggregate: Record<string, unknown>;
  extra_data: Record<string, unknown>;
  id: string;
  occurred_on: string;
};

export class DomainEventDeserializer extends Map<string, DomainEventClass> {
  static configure(subscribers: DomainEventSubscriber[]) {
    const mapping = new DomainEventDeserializer();
    subscribers.forEach((subscriber) => {
      subscriber.subscribedTo().forEach(mapping.registerEvent.bind(mapping));
    });

    return mapping;
  }

  private registerEvent(domainEvent: DomainEventClass) {
    const eventName = domainEvent.EVENT_NAME;
    this.set(eventName, domainEvent);
  }

  deserialize(event: string) {
    const eventData = JSON.parse(event).data as DomainEventJSON;
    const { type, aggregate, extra_data, id, occurred_on } = eventData;
    const eventClass = super.get(type);

    if (!eventClass) {
      throw Error(`DomainEvent mapping not found for event ${type}`);
    }

    return eventClass.fromPrimitives({
      aggregate,
      extra_data,
      occurredOn: new Date(occurred_on),
      eventId: id,
    });
  }
}
