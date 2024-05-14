import {
  CommandHandlers,
  DomainEventFailOverPublisher,
  InMemoryCommandBus,
  InMemoryQueryBus,
  Logger,
  MongoConnection,
  QueryHandlers,
  RabbitMQConnection,
  RabbitMQEventBus,
} from '@ducen-services/shared';
import { Provider } from '@nestjs/common';

export const busesProvider: Provider[] = [
  {
    provide: 'EVENT_BUS',
    inject: ['QUEUE_CONNECTION', 'DATABASE_CONNECTION', 'LOGGER_SERVICE'],
    useFactory: (qConnection: RabbitMQConnection, dbConnection: MongoConnection, logger: Logger) => {
      const failoverPublisher = new DomainEventFailOverPublisher(dbConnection);
      return new RabbitMQEventBus(failoverPublisher, qConnection, 'ducen', logger);
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
];