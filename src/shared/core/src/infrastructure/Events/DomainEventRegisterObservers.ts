import { DomainEventSubscriber } from '../../domain/core/DomainEvent';

export class DomainEventRegisterObservers {
  constructor(public subscribers: Array<DomainEventSubscriber>) {}
}
