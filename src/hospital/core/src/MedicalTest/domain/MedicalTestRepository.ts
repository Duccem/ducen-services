import { MedicalTest } from './MedicalTest';

export interface MedicalTestRepository {
  save(result: MedicalTest): Promise<void>;
  search(patientId: string): Promise<MedicalTest[]>;
}
