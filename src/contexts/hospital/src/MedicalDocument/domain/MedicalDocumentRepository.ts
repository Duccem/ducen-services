import { Uuid } from '@ducen-services/shared';
import { MedicalDocument } from './MedicalDocument';

export interface MedicalDocumentRepository {
  save(medicalDocument: MedicalDocument): Promise<void>;
  findByPatientId(userId: Uuid): Promise<MedicalDocument[]>;
}