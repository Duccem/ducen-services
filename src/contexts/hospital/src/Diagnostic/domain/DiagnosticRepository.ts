import { Uuid } from '@ducen-services/shared';
import { Diagnostic } from './Diagnostic';

export interface DiagnosticRepository {
  save(diagnostic: Diagnostic): Promise<void>;
  searchByPatientId(patientId: Uuid): Promise<Diagnostic[]>;
}
