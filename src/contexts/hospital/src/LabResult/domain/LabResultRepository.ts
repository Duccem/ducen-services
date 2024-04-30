import { LabResult } from './LabResult';

export interface LabResultRepository {
  save(result: LabResult): Promise<void>;
  search(patientId: string): Promise<LabResult[]>;
}
