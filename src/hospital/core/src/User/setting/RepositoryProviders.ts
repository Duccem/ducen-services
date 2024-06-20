import { Logger, MongoConnection } from '@ducen/shared';
import { MongoUserRepository } from '../infrastructure/persistence/mongodb/MongoUserRepository';

export const userRepositories = [
  {
    provide: 'USER_REPOSITORY',
    inject: ['DATABASE_CONNECTION', 'LOGGER_SERVICE'],
    useFactory: async (connection: MongoConnection, logger: Logger) => {
      const repository = new MongoUserRepository(connection, logger);
      return repository;
    },
  },
];
