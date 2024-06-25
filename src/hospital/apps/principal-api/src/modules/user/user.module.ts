import {
  JWTStrategy,
  LlamaHabitsGenerator,
  UserController,
  UserResolver,
  UserSearcher,
} from '@ducen/hospital';
import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
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
