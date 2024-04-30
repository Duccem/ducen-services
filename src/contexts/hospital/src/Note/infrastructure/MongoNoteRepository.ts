import { Criteria, MongoRepository } from '@ducen-services/shared';
import { Note } from '../domain/Note';
import { NoteRepository } from '../domain/NoteRepository';

export class MongoNoteRepository extends MongoRepository<Note> implements NoteRepository {
  async index(): Promise<void> {
    await this.collection.createIndex({ id: 1 });
  }
  async searchBy(criteria: Criteria): Promise<Note[]> {
    const notes = await this.searchByCriteria(criteria);
    return notes.map((note) => Note.fromPrimitives(note));
  }
  async save(note: Note): Promise<void> {
    await this.persist(note.id.toString(), note);
  }
}
