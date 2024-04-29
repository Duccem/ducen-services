import { Command } from '../../../../src/domain/Command/Command';

export class DummyCommand extends Command {
  static COMMAND_NAME = 'handled.command';
}
