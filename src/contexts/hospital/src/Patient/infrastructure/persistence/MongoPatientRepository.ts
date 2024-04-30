import { Criteria, MongoRepository } from '@ducen-services/shared';
import { Patient } from '../../domain/Patient';
import { PatientRepository } from '../../domain/PatientRepository';

export class MongoPatientRepository extends MongoRepository<Patient> implements PatientRepository {
  index(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async searchPatientsByCriteria(criteria: Criteria): Promise<Patient[]> {
    const patients = await this.searchByCriteria(criteria);
    return patients.map(Patient.fromPrimitives);
  }

  async save(patient: Patient): Promise<void> {
    await this.persist(patient.id.value, patient);
  }
}
