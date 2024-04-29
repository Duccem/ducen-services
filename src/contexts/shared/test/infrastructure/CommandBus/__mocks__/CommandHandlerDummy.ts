import { CommandHandler } from '../../../../src/domain/Command/CommandHandler';
import { DummyCommand } from './DummyCommand';

export class CommandHandlerDummy implements CommandHandler<DummyCommand> {
  subscribedTo(): DummyCommand {
    return DummyCommand;
  }

  async handle(command: DummyCommand): Promise<void> {}
}
