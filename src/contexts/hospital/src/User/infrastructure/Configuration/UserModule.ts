import { Module } from '@nestjs/common';
import { JWTStrategy, UserSearcher } from '../../../..';
import { SharedModule } from '../../../Shared/infrastructure/Configuration/SharedModule';
import { UserController } from '../Presentation/UserController';
import { UserResolver } from '../Presentation/UserResolver';
import { LlamaHabitsGenerator } from '../Services/LlamaHabitsGenerator';
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
