import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { DiagnosticRepository } from '../../domain/DiagnosticRepository';

export class PatientDiagnosticsGetter {
  constructor(
    private readonly repository: DiagnosticRepository,
    private readonly patientSearcher: PatientSearcher,
  ) {}

  async run(patientId: string) {
    const patient = await this.patientSearcher.run(patientId);
    if (!patient) throw new Error('Patient not found');
    return this.repository.searchByPatientId(patient.id);
  }
}
