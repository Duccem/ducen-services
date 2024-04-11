import { CommandHandler } from '@ducen/core';
import { DummyCommand } from './DummyCommand';

export class CommandHandlerDummy implements CommandHandler<DummyCommand> {
  subscribedTo(): DummyCommand {
    return DummyCommand;
  }

  async handle(command: DummyCommand): Promise<void> {}
}
