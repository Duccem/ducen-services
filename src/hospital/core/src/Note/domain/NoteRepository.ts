import { Criteria } from '@ducen/shared';
import { Note } from './Note';

export interface NoteRepository {
  searchBy(criteria: Criteria): Promise<Note[]>;
  save(note: Note): Promise<void>;
}
