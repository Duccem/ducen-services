import { Uuid } from '@ducen/shared';
import { Diagnostic } from './Diagnostic';

export interface DiagnosticRepository {
  save(diagnostic: Diagnostic): Promise<void>;
  searchByPatientId(patientId: Uuid): Promise<Diagnostic[]>;
}
