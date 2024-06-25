import {
  CommandHandlers,
  GeneralEventBus,
  GraphQLEventBus,
  InMemoryCommandBus,
  InMemoryEventBus,
  InMemoryQueryBus,
  InMemoryTaskBus,
  QueryHandlers,
  TaskHandlers,
} from '@ducen/shared';
import { Provider } from '@nestjs/common';

export const busesProvider: Provider[] = [
  {
    provide: 'EXTERNAL_EVENT_BUS',
    useFactory: () => {
      return new GraphQLEventBus();
    },
  },
  {
    provide: 'INTERNAL_EVENT_BUS',
    useFactory: () => {
      return new InMemoryEventBus();
    },
  },
  {
    provide: 'EVENT_BUS',
    inject: ['INTERNAL_EVENT_BUS', 'EXTERNAL_EVENT_BUS'],
    useFactory: (internalEventBus, externalEventBus) => {
      return new GeneralEventBus(internalEventBus, externalEventBus);
    },
  },
  {
    provide: 'COMMAND_BUS',
    useFactory: () => {
      return new InMemoryCommandBus(new CommandHandlers([]));
    },
  },
  {
    provide: 'QUERY_BUS',
    useFactory: () => {
      return new InMemoryQueryBus(new QueryHandlers([]));
    },
  },
  {
    provide: 'TASK_BUS',
    useFactory: () => {
      return new InMemoryTaskBus(new TaskHandlers([]));
    },
  },
];
