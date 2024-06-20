import { Command, CommandHandler } from '../../domain/core/Command';
import { InternalError } from '../../domain/implementations/errors/InternalError';

export class CommandHandlers extends Map<Command, CommandHandler<Command>> {
  constructor(commandHandlers: Array<CommandHandler<Command>>) {
    super();

    commandHandlers.forEach((commandHandler) => {
      this.set(commandHandler.subscribedTo(), commandHandler);
    });
  }

  public get(command: Command): CommandHandler<Command> {
    const commandHandler = super.get(command.constructor);

    if (!commandHandler) {
      throw new InternalError(
        `The command <${command.constructor.name}> hasn't a command handler associated`,
      );
    }

    return commandHandler;
  }

  public addCommands(commandHandlers: Array<CommandHandler<Command>>): void {
    commandHandlers.forEach((commandHandler) => {
      this.set(commandHandler.subscribedTo(), commandHandler);
    });
  }

  public addCommand(commandHandler: CommandHandler<Command>): void {
    this.set(commandHandler.subscribedTo(), commandHandler);
  }
}
