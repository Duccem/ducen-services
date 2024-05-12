import { DynamicModule, Module } from '@nestjs/common';
import { commandHandlers } from './CommandProviders';
import { queryHandlers } from './QueryProviders';
import { userRepositories } from './RepositoryProviders';

@Module({})
export class UserModule {
  static register(imports: any[]): DynamicModule {
    return {
      imports,
      module: UserModule,
      providers: [...userRepositories, ...queryHandlers, ...commandHandlers],
      exports: ['USER_REPOSITORY'],
    };
  }
}
