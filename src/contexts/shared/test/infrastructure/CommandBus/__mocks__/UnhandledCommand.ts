import { Command } from '../../../../src/domain/Command/Command';

export class UnhandledCommand extends Command {
  static COMMAND_NAME = 'unhandled.command';
}
