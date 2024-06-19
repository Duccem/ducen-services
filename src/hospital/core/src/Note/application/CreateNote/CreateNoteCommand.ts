import { Command } from '@ducen/shared';
import { NotePayload } from './NoteCreator';

export class CreateNoteCommand extends Command {
  constructor(public note: NotePayload) {
    super();
  }
}
