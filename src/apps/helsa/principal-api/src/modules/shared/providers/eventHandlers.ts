import { SendWelcomeEmailSubscriber } from '@helsa/modules';
import { Provider } from '@nestjs/common';
import { DomainEventRegisterObservers } from '@shared/adapters-server';
import { DomainEventSubscriber } from '@shared/core';

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
