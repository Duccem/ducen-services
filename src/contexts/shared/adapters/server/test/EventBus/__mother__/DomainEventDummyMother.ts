import { UuidMother } from '@shared/core';
import { DomainEventDummy } from '../__mocks__/DomainEventDummy';

export class DomainEventDummyMother {
  static random() {
    return new DomainEventDummy({
      aggregateId: UuidMother.random(),
      eventId: UuidMother.random(),
      occurredOn: new Date(),
    });
  }
}
