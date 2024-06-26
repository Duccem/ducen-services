import { Criteria } from '@ducen/shared';
import { Patient } from './Patient';

export interface PatientRepository {
  save(patient: Patient): Promise<void>;
  searchPatientsByCriteria(criteria: Criteria): Promise<Patient[]>;
  getPatientByCriteria(criteria: Criteria): Promise<Patient>;
}
