import { Criteria, Nullable } from '@shared/core';
import { Doctor } from './Doctor';

export interface DoctorRepository {
  save(doctor: Doctor): Promise<void>;
  findDoctorByCriteria(criteria: Criteria): Promise<Nullable<Doctor>>;
  listDoctorsByCriteria(criteria: Criteria): Promise<Nullable<Doctor[]>>;
  findNearDoctors(latitude: number, longitude: number, maxDistance: number): Promise<Nullable<Doctor[]>>;
}
