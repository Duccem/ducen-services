import { Command } from '../../../../src/domain/core/Command';

export class UnhandledCommand extends Command {
  static COMMAND_NAME = 'unhandled.command';
}
