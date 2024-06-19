import { Doctor } from '../../domain/Doctor';
import { DoctorRepository } from '../../domain/DoctorRepository';
import { GetByIdCriteria } from '../../domain/GetByIdCriteria';

export class DoctorSearcher {
  constructor(private repository: DoctorRepository) {}

  async run(id: string): Promise<Doctor> {
    const doctor = await this.repository.findDoctorByCriteria(new GetByIdCriteria(id));
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    return doctor;
  }
}
