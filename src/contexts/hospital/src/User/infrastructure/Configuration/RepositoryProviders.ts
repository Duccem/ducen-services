import { Logger, MongoConnection } from '@ducen-services/shared';
import { MongoUserRepository } from '../Persistence/MongoDB/MongoUserRepository';

export const userRepositories = [
  {
    provide: 'USER_REPOSITORY',
    inject: ['DATABASE_CONNECTION', 'LOGGER_SERVICE'],
    useFactory: async (connection: MongoConnection, logger: Logger) => {
      const repository = new MongoUserRepository(connection, logger);
      await repository.index();
      return repository;
    },
  },
];
