import { DomainEvent } from '../../../domain/core/DomainEvent';

export class DomainEventSerializer {
  static serialize(event: DomainEvent): string {
    return JSON.stringify({
      data: {
        id: event.eventId,
        type: event.eventName,
        occurred_on: event.occurredOn.toISOString(),
        aggregate: event.aggregate,
      },
    });
  }
}
