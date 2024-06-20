import { Module } from '@nestjs/common';
import { SharedModule } from '../../Shared/infrastructure/Configuration/SharedModule';
import { UserSearcher } from '../application/SearchUser/UserSearcher';
import { LlamaHabitsGenerator } from '../infrastructure/generators/LlamaHabitsGenerator';
import { UserResolver } from '../presentation/graphql/UserResolver';
import { JWTStrategy } from '../presentation/helpers/middlewares/JWTStrategy';
import { UserController } from '../presentation/rest/UserController';
import { commandHandlers } from './CommandProviders';
import { queryHandlers } from './QueryProviders';
import { userRepositories } from './RepositoryProviders';

@Module({
  imports: [SharedModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'HABITS_GENERATOR',
      inject: ['VECTOR_STORE_CONNECTION', 'LLM_CONFIGURATION'],
      useFactory: (connection, conf) => new LlamaHabitsGenerator(connection, conf),
    },
    ...userRepositories,
    {
      provide: UserSearcher,
      inject: ['USER_REPOSITORY'],
      useFactory: (repository) => new UserSearcher(repository),
    },
    JWTStrategy,
    ...queryHandlers,
    ...commandHandlers,
    UserResolver,
  ],
  exports: ['USER_REPOSITORY', UserSearcher, JWTStrategy],
})
export class UserModule {}
