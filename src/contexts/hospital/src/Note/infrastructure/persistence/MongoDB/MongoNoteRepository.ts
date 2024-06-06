import { Criteria, Logger, MongoConnection, MongoRepository } from '@ducen-services/shared';
import { Note } from '../../../domain/Note';
import { NoteRepository } from '../../../domain/NoteRepository';
import { MongoNoteSchema } from './MongoNoteSchema';

export class MongoNoteRepository extends MongoRepository<Note> implements NoteRepository {
  constructor(connection: MongoConnection, logger: Logger) {
    super(Note, connection, logger);
  }
  get schema() {
    return MongoNoteSchema;
  }
  async searchBy(criteria: Criteria): Promise<Note[]> {
    const notes = await this.searchByCriteria(criteria);
    return notes.map((note) => Note.fromPrimitives(note));
  }
  async save(note: Note): Promise<void> {
    await this.persist(note.id.toString(), note);
  }
}
