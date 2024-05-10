import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { MedicalTestRepository } from '../../domain/MedicalTestRepository';

export class ResultGetter {
  constructor(
    private repository: MedicalTestRepository,
    private readonly patientSearcher: PatientSearcher,
  ) {}
  async run(patientId: string) {
    const patient = await this.patientSearcher.run(patientId);
    return this.repository.search(patient.id.toString());
  }
}
