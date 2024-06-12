import { Command } from '../../../../src/domain/core/Command';

export class DummyCommand extends Command {
  static COMMAND_NAME = 'handled.command';
}
