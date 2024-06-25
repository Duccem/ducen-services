import { MongoUserRepository } from '@ducen/hospital';
import { Logger, MongoConnection } from '@ducen/shared';

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
