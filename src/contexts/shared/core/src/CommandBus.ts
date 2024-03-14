import { Command } from './Command';
import { CommandHandler } from './CommandHandler';

export interface CommandBus {
  dispatch(command: Command): Promise<void>;
  addHandlers(commandHandlers: Array<CommandHandler<Command>>): void;
}
