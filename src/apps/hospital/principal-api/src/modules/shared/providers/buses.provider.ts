import {
    CommandHandlers,
    DomainEventFailOverPublisher,
    InMemoryCommandBus,
    InMemoryQueryBus, Logger, MongoConnection,
    QueryHandlers,
    RabbitMQConnection,
    RabbitMQEventBus
} from '@ducen-services/shared';
import { Provider } from '@nestjs/common';

export const busesProvider: Provider[] = [
  {
    provide: 'EVENT_BUS',
    inject: ['QUEUE_CONNECTION', 'DATABASE_CONNECTION', 'LOGGER_SERVICE'],
    useFactory: (qConnection: RabbitMQConnection, dbConnection: MongoConnection, logger: Logger) => {
      const failoverPublisher = new DomainEventFailOverPublisher(dbConnection);
      const eventBus = new RabbitMQEventBus(failoverPublisher, qConnection, 'ducen', logger);
      return eventBus;
    },
  },
  {
    provide: 'COMMAND_BUS',
    useFactory: () => {
      const handlers = new CommandHandlers([]);
      return new InMemoryCommandBus(handlers);
    },
  },
  {
    provide: 'QUERY_BUS',
    useFactory: () => {
      const handlers = new QueryHandlers([]);
      return new InMemoryQueryBus(handlers);
    },
  },
];
