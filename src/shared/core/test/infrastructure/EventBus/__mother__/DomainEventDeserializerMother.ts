import { DomainEventDeserializer } from '../../../../src/infrastructure/EventBus/DomainEventDeserializer';
import { DomainEventSubscriberDummy } from '../__mocks__/DomainEventSubscriberDummy';

export class DomainEventDeserializerMother {
  static create() {
    const dummySubscriber = new DomainEventSubscriberDummy();
    return DomainEventDeserializer.configure([dummySubscriber]);
  }
}
