import { DomainEvent, EventBus } from '../../../domain/core/DomainEvent';

export class GeneralEventBus implements EventBus {
  constructor(
    private internalEventBus: EventBus,
    private externalEventBus: EventBus,
  ) {}

  async publish(events: DomainEvent[]): Promise<void> {
    const externalEvents = events.filter((event) => event.isPublic());
    await this.internalEventBus.publish(events);
    await this.externalEventBus.publish(externalEvents);
  }
}
