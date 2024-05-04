import { Criteria, Nullable, Uuid } from '@ducen-services/shared';
import { Treatment } from './Treatment';

export interface TreatmentRepository {
  save(treatment: Treatment): Promise<void>;
  find(treatmentId: Uuid): Promise<Nullable<Treatment>>;
  search(criteria: Criteria): Promise<Treatment[]>;
}
