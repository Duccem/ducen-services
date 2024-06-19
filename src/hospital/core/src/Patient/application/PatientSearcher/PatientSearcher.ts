import { GetById } from '../../domain/GetById';
import { Patient } from '../../domain/Patient';
import { PatientRepository } from '../../domain/PatientRepository';

export class PatientSearcher {
  constructor(private readonly repository: PatientRepository) {}

  async run(id: string): Promise<Patient> {
    const patient = await this.repository.getPatientByCriteria(new GetById(id));
    if (!patient) {
      throw new Error('Patient not found');
    }
    return patient;
  }
}
