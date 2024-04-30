import { Query, QueryHandler } from '@ducen-services/shared';
import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { PatientRepository } from '../../../Patient/domain/PatientRepository';
import { NoteRepository } from '../../domain/NoteRepository';
import { GetNotesQuery } from './GetNotesQuery';
import { NotesGetter } from './NotesGetter';

export class GetNotesQueryHandler implements QueryHandler<GetNotesQuery> {
  private getter: NotesGetter;
  constructor(noteRepository: NoteRepository, patientRepository: PatientRepository) {
    this.getter = new NotesGetter(noteRepository, new PatientSearcher(patientRepository));
  }

  subscribedTo(): Query {
    return GetNotesQuery;
  }

  public async handle(query: GetNotesQuery): Promise<any> {
    return this.getter.run(query.patientId);
  }
}
