import { Command, CommandHandler } from '@ducen/core';
import { FlagRepository } from '../../domain/FlagRepository';
import { CreateFlag } from './CreateFlag';
import { CreateFlagCommand } from './CreateFlagCommand';

export class CreateFlagHandler implements CommandHandler<CreateFlagCommand> {
  private createFlag: CreateFlag;
  constructor(private readonly flagRepository: FlagRepository) {
    this.createFlag = new CreateFlag(flagRepository);
  }

  subscribedTo(): Command {
    return CreateFlagCommand;
  }

  public async handle(command: CreateFlagCommand): Promise<void> {
    return await this.createFlag.create(command.flag);
  }
}
