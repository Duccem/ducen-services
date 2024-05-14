import { Uuid } from '@ducen-services/shared';
import { DoctorRating } from './DoctorRating';

export interface DoctorRatingRepository {
  save(rating: DoctorRating): Promise<void>;
  findDoctorRatings(doctorId: Uuid): Promise<DoctorRating[]>;
}
