
import { DomainEventDeserializer } from '../../../src/Events/DomainEventDeserializer';
import { DomainEventSubscriberDummy } from '../__mocks__/DomainEventSubscriberDummy';

export class DomainEventDeserializerMother {
  static create() {
    const dummySubscriber = new DomainEventSubscriberDummy();
    return DomainEventDeserializer.configure([dummySubscriber]);
  }
}
