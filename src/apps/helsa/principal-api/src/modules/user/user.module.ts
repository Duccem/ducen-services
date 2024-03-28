import { Module } from '@nestjs/common';
import { MongoConnection } from '@shared/adapters-server';
import { Command, CommandBus, CommandHandler, Logger, Query, QueryBus, QueryHandler } from '@shared/core';
import { SharedModule } from '../shared/shared.module';
import { MongoUserRepository } from './adapters/persistance/MongoDB/MongoUserRepository';
import { JWTAuthService } from './adapters/service/JWTAuthService';
import { commandHandlers, userCommandHandlers } from './providers/user.command.providers';
import { queryHandlers, userQueryHandlers } from './providers/user.query.providers';
import { UserController } from './ui/user.controller';
import { UserResolver } from './ui/user.resolver';

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
})
export class UserModule {}
