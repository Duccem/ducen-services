import { Logger, MongoConnection } from '@ducen-services/shared';
import { MongoUserRepository } from '../Persistence/MongoDB/MongoUserRepository';

export const userRepositories = [
  {
    provide: 'USER_REPOSITORY',
    inject: ['DATABASE_CONNECTION', 'LOGGER_SERVICE'],
    useFactory: (connection: MongoConnection, logger: Logger) => new MongoUserRepository(connection, logger),
  },
];
