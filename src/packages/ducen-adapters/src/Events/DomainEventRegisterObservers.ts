import { DomainEventSubscriber } from '@ducen/core';

export class DomainEventRegisterObservers {
  constructor(public subscribers: Array<DomainEventSubscriber>) {}
}
