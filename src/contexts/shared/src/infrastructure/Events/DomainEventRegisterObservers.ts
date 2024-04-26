import { DomainEventSubscriber } from '../../domain/DomainEventSubscriber';

export class DomainEventRegisterObservers {
  constructor(public subscribers: Array<DomainEventSubscriber>) {}
}
