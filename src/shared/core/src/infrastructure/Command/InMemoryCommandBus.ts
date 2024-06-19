import { Command, CommandBus, CommandHandler } from '../../domain/core/Command';
import { CommandHandlers } from './CommandHandlers';

export class InMemoryCommandBus implements CommandBus {
  constructor(private commandHandlers: CommandHandlers) {}

  async dispatch(command: Command): Promise<void> {
    const handler = this.commandHandlers.get(command);

    await handler.handle(command);
  }

  addHandlers(commandHandlers: Array<CommandHandler<Command>>): void {
    this.commandHandlers.addCommands(commandHandlers);
  }

  addHandler(commandHandler: CommandHandler<Command>): void {
    this.commandHandlers.addCommand(commandHandler);
  }
}
