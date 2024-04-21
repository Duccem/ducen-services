import { CommandBus, QueryBus } from '@ducen/core';
import { CreateFlagCommand, GetFlagQuery } from '@helsa/modules';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver('Flag')
export class FlagResolver {
  constructor(
    @Inject('QUERY_BUS') private queryBus: QueryBus,
    @Inject('COMMAND_BUS') private commandBus: CommandBus,
  ) {}

  @Query('flags')
  async flags(@Args('id') id: string) {
    const query = new GetFlagQuery(id);
    return await this.queryBus.ask(query);
  }

  @Mutation('createFlag')
  async createFlag(@Args('flag') flag: any) {
    const command = new CreateFlagCommand(flag);
    await this.commandBus.dispatch(command);
    return null;
  }

  @Mutation('updateFlag')
  async updateFlag() {
    throw new Error('Method not implemented.');
  }
  @Mutation('deleteFlag')
  async deleteFlag() {
    throw new Error('Method not implemented.');
  }
}
