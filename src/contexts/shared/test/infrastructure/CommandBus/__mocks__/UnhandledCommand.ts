import { Command } from '../../../../src/domain/Command';

export class UnhandledCommand extends Command {
  static COMMAND_NAME = 'unhandled.command';
}
