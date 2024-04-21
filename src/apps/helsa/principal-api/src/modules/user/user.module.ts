import { MongoConnection } from '@ducen/adapters';
import { Command, CommandBus, CommandHandler, Logger, Query, QueryBus, QueryHandler } from '@ducen/core';
import { JWTAuthService, MongoUserRepository } from '@helsa/modules';
import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { commandHandlers, userCommandHandlers } from './user.command.providers';
import { UserController } from './user.controller';
import { queryHandlers, userQueryHandlers } from './user.query.providers';
import { UserResolver } from './user.resolver';

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      inject: ['DATABASE_CONNECTION', 'LOGGER_SERVICE'],
      useFactory: (connection: MongoConnection, logger: Logger) => new MongoUserRepository(connection, logger),
    },
    {
      provide: 'AUTH_SERVICE',
      inject: ['AUTH_CONFIGURATION'],
      useFactory: (conf: any) => new JWTAuthService(conf.authKey),
    },
    ...queryHandlers,
    ...commandHandlers,
    {
      provide: 'USER_QUERY_HANDLERS',
      inject: ['QUERY_BUS', ...userQueryHandlers],
      useFactory: (queryBus: QueryBus, ...handlers: QueryHandler<Query>[]) => {
        queryBus.addQueryHandlers(handlers);
        return;
      },
    },
    {
      provide: 'USER_COMMAND_HANDLERS',
      inject: ['COMMAND_BUS', ...userCommandHandlers],
      useFactory: (commandBus: CommandBus, ...handlers: CommandHandler<Command>[]) => {
        commandBus.addHandlers(handlers);
        return;
      },
    },
    UserResolver,
  ],
  controllers: [UserController],
  exports: ['USER_REPOSITORY', 'AUTH_SERVICE'],
})
export class UserModule {}
