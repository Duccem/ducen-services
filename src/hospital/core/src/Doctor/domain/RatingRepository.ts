import { Uuid } from '@ducen/shared';
import { DoctorRating } from './DoctorRating';

export interface DoctorRatingRepository {
  save(rating: DoctorRating): Promise<void>;
  findDoctorRatings(doctorId: Uuid): Promise<DoctorRating[]>;
}
