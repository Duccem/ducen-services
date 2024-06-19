import { Command, CommandHandler } from '@ducen/shared';
import { FlagRepository } from '../../domain/FlagRepository';
import { CreateFlag } from './CreateFlag';
import { CreateFlagCommand } from './CreateFlagCommand';

export class CreateFlagHandler implements CommandHandler<CreateFlagCommand> {
  private createFlag: CreateFlag;
  constructor(flagRepository: FlagRepository, cacheRepository: FlagRepository) {
    this.createFlag = new CreateFlag(flagRepository, cacheRepository);
  }

  subscribedTo(): Command {
    return CreateFlagCommand;
  }

  public async handle(command: CreateFlagCommand): Promise<void> {
    return await this.createFlag.create(command.flag);
  }
}
