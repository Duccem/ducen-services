import { SendWelcomeEmailSubscriber } from '@ducen-services/hospital';
import { DomainEventRegisterObservers, DomainEventSubscriber } from '@ducen-services/shared';
import { Provider } from '@nestjs/common';

export const eventHandlers: Provider[] = [SendWelcomeEmailSubscriber];

export const eventHandlersRegister = [SendWelcomeEmailSubscriber];

export const EventSubscribers = {
  provide: 'EVENT_SUBSCRIBERS',
  inject: ['EVENT_BUS', ...eventHandlersRegister],
  useFactory: (eventBus: any, ...handlers: DomainEventSubscriber[]) => {
    const subscribers = new DomainEventRegisterObservers(handlers);
    eventBus.addSubscribers(subscribers);
    return subscribers;
  },
};
