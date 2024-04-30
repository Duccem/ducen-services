import { Command } from '@ducen-services/shared';
import { NotePayload } from './NoteCreator';

export class CreateNoteCommand extends Command {
  constructor(public note: NotePayload) {
    super();
  }
}
