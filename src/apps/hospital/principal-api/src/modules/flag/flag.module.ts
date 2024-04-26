import { MongoFlagRepository } from '@ducen-services/hospital';
import { Command, CommandBus, CommandHandler, Logger, MongoConnection, Query, QueryBus, QueryHandler } from '@ducen-services/shared';
import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { UserModule } from '../user/user.module';
import { commandHandlers, flagCommandHandlers } from './flag.command.providers';
import { flagQueryHandlers, queryHandlers } from './flag.query.providers';
import { FlagResolver } from './flag.resolver';

@Module({
  imports: [SharedModule, UserModule],
  providers: [
    {
      provide: 'FLAG_REPOSITORY',
      inject: ['DATABASE_CONNECTION', 'LOGGER_SERVICE'],
      useFactory: (connection: MongoConnection, logger: Logger) => new MongoFlagRepository(connection, logger),
    },
    ...queryHandlers,
    ...commandHandlers,
    {
      provide: 'FLAG_QUERY_HANDLERS',
      inject: ['QUERY_BUS', ...flagQueryHandlers],
      useFactory: (queryBus: QueryBus, ...handlers: QueryHandler<Query>[]) => {
        queryBus.addQueryHandlers(handlers);
        return;
      },
    },
    {
      provide: 'FLAG_COMMAND_HANDLERS',
      inject: ['COMMAND_BUS', ...flagCommandHandlers],
      useFactory: (commandBus: CommandBus, ...handlers: CommandHandler<Command>[]) => {
        commandBus.addHandlers(handlers);
        return;
      },
    },
    FlagResolver,
  ],
  exports: ['FLAG_REPOSITORY'],
  controllers: [],
})
export class FlagModule {}
