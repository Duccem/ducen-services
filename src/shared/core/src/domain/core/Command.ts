export abstract class Command {}
export interface CommandHandler<T extends Command> {
  subscribedTo(): Command;
  handle(command: T): Promise<void>;
}
export interface CommandBus {
  dispatch(command: Command): Promise<void>;
  addHandlers(commandHandlers: Array<CommandHandler<Command>>): void;
  addHandler(commandHandler: CommandHandler<Command>): void;
}
