import { DomainEventSubscriber } from '@shared/core';

export class DomainEventRegisterObservers {
  constructor(public subscribers: Array<DomainEventSubscriber>) {}
}
