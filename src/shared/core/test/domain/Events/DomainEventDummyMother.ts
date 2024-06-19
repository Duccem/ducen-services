import { UuidMother } from '../../../src/domain/common/mothers/UuidMother';
import { DomainEventDummy } from '../../infrastructure/EventBus/__mocks__/DomainEventDummy';

export class DomainEventDummyMother {
  static random() {
    return new DomainEventDummy({
      aggregateId: new UuidMother().generate(),
      eventId: new UuidMother().generate(),
      occurredOn: new Date(),
    });
  }
}
