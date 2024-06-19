import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { MedicalDocument } from '../../domain/MedicalDocument';
import { MedicalDocumentRepository } from '../../domain/MedicalDocumentRepository';

export class UserDocumentsGetter {
  constructor(
    private readonly repository: MedicalDocumentRepository,
    private readonly patientSearcher: PatientSearcher,
  ) {}

  async run(patientId: string): Promise<MedicalDocument[]> {
    const patient = await this.patientSearcher.run(patientId);
    return this.repository.findByPatientId(patient.id);
  }
}
