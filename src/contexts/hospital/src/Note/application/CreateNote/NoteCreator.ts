import { DoctorSearcher } from '../../../Doctor/application/SearchDoctor/DoctorSearcher';
import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { UserSearcher } from '../../../User/application/UserSearcher/UserSearcher';
import { Note } from '../../domain/Note';
import { NoteRepository } from '../../domain/NoteRepository';
export type NotePayload = {
  id: string;
  patientId: string;
  doctorId: string;
  content: string;
};
export class NoteCreator {
  constructor(
    private repository: NoteRepository,
    private doctorSearcher: DoctorSearcher,
    private patientSearcher: PatientSearcher,
    private userSearcher: UserSearcher,
  ) {}

  async run({ content, doctorId, id, patientId }: NotePayload) {
    await this.patientSearcher.run(patientId);
    const doctor = await this.getDoctorData(doctorId);
    const note = Note.Create(id, patientId, doctor, content);
    await this.repository.save(note);
  }

  async getDoctorData(doctorId: string) {
    const doctor = await this.doctorSearcher.run(doctorId);
    const user = await this.userSearcher.run('id', doctor.user.toString());

    return {
      id: doctor.id.toString(),
      fullName: user.name.fullName(),
      photo: user.photo.toString(),
      specialty: doctor.specialty.toString(),
    };
  }
}
