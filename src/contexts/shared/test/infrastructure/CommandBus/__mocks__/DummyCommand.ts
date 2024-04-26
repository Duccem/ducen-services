import { Command } from '../../../../src/domain/Command';

export class DummyCommand extends Command {
  static COMMAND_NAME = 'handled.command';
}
