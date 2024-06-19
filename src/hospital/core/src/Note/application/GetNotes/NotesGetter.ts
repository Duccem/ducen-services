import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { GetByPatientCriteria } from '../../domain/GetByPatientCriteria';
import { Note } from '../../domain/Note';
import { NoteRepository } from '../../domain/NoteRepository';

export class NotesGetter {
  constructor(
    private repository: NoteRepository,
    private patientSearcher: PatientSearcher,
  ) {}

  async run(patientId: string): Promise<Note[]> {
    await this.patientSearcher.run(patientId);
    return await this.repository.searchBy(new GetByPatientCriteria(patientId));
  }
}
