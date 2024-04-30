import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { LabResultRepository } from '../../domain/LabResultRepository';

export class ResultGetter {
  constructor(
    private repository: LabResultRepository,
    private readonly patientSearcher: PatientSearcher,
  ) {}
  async run(patientId: string) {
    const patient = await this.patientSearcher.run(patientId);
    return this.repository.search(patient.id.toString());
  }
}
