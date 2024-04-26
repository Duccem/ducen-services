import { DomainEvent } from '../../../../src/domain/DomainEvent';

export class DomainEventDummy extends DomainEvent {
  static readonly EVENT_NAME = 'dummy';

  constructor(data: { aggregateId: string; eventId?: string; occurredOn?: Date }) {
    const { aggregateId, eventId, occurredOn } = data;
    super(DomainEventDummy.EVENT_NAME, aggregateId, eventId, occurredOn);
  }

  toPrimitive() {
    return {};
  }

  static fromPrimitives(params: { aggregateId: string; attributes: {}; eventId: string; occurredOn: Date }) {
    const { aggregateId, eventId, occurredOn } = params;
    return new DomainEventDummy({
      aggregateId,
      eventId,
      occurredOn,
    });
  }
}
