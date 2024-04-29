import { DomainEventSubscriber } from '../../domain/Events/DomainEventSubscriber';

export class DomainEventRegisterObservers {
  constructor(public subscribers: Array<DomainEventSubscriber>) {}
}
