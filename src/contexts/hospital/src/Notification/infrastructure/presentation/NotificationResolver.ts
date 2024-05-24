import { CommandBus, QueryBus } from '@ducen-services/shared';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SendEmailRecoveryCodeCommand } from '../../application/SendEmailRecoveryCode/SendEmailRecoveryCodeCommand';

@Resolver('Notification')
export class NotificationResolver {
  constructor(
    @Inject('QUERY_BUS') private queryBus: QueryBus,
    @Inject('COMMAND_BUS') private commandBus: CommandBus,
  ) {}

  @Mutation('sendEmailRecoveryCode')
  async sendEmailRecoveryCode(@Args('email') email: string) {
    const command = new SendEmailRecoveryCodeCommand(email);
    await this.commandBus.dispatch(command);
  }
}
