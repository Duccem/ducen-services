import { UuidMother } from '../../../src/domain/Mothers/UuidMother';
import { DomainEventDummy } from '../../infrastructure/EventBus/__mocks__/DomainEventDummy';

export class DomainEventDummyMother {
  static random() {
    return new DomainEventDummy({
      aggregateId: UuidMother.random(),
      eventId: UuidMother.random(),
      occurredOn: new Date(),
    });
  }
}
