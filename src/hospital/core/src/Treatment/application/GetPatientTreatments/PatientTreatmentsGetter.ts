import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { GetTreatmentByPatientIdCriteria } from '../../domain/GetTreatmentByPatientIdCriteria';
import { TreatmentRepository } from '../../domain/TreatmentRepository';

export class PatientTreatmentsGetter {
  constructor(
    private readonly repository: TreatmentRepository,
    private readonly patientSearcher: PatientSearcher,
  ) {}

  async run(patientId: string) {
    const patient = await this.patientSearcher.run(patientId);
    return this.repository.search(new GetTreatmentByPatientIdCriteria(patient.id));
  }
}
