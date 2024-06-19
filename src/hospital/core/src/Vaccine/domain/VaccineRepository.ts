import { Criteria } from '@ducen/shared';
import { Vaccine } from './Vaccine';

export interface VaccineRepository {
  save(vaccine: Vaccine): Promise<void>;
  listByCriteria(criteria: Criteria): Promise<Vaccine[]>;
}
