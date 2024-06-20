import { Provider } from '@nestjs/common';
import { MongoUserRepository } from '../../../User/infrastructure/persistence/mongodb/MongoUserRepository';
import { MongoNotificationRepository } from '../persistence/MongoNotificationRepository';

export const notificationRepositories: Provider[] = [
  {
    provide: 'NOTIFICATION_REPOSITORY',
    inject: ['DATABASE_CONNECTION', 'LOGGER_SERVICE'],
    useFactory: (connection, logger) => new MongoNotificationRepository(connection, logger),
  },
  {
    provide: 'NOTIFICATION_USER_REPOSITORY',
    inject: ['DATABASE_CONNECTION', 'LOGGER_SERVICE'],
    useFactory: (connection, logger) => new MongoUserRepository(connection, logger),
  },
];
