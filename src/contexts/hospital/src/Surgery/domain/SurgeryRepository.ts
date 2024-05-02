import { Surgery } from './Surgery';

export interface SurgeryRepository {
  save(surgery: Surgery): Promise<void>;
  searchByPatientId(patientId: string): Promise<Surgery[]>;
}
