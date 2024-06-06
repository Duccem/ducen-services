import { Criteria, Logger, MongoConnection, MongoRepository, Primitives } from '@ducen-services/shared';
import { Patient } from '../../domain/Patient';
import { PatientRepository } from '../../domain/PatientRepository';
import { MongoPatientSchema } from './MongoPatientSchema';

export class MongoPatientRepository extends MongoRepository<Patient> implements PatientRepository {
  constructor(connection: MongoConnection, logger: Logger) {
    super(Patient, connection, logger);
  }

  get schema() {
    return MongoPatientSchema;
  }

  async searchPatientsByCriteria(criteria: Criteria): Promise<Patient[]> {
    const patients = await this.searchByCriteria(criteria);
    return patients.map(Patient.fromPrimitives);
  }

  async save(patient: Patient): Promise<void> {
    await this.persist(patient.id.value, patient);
  }

  async getPatientByCriteria(criteria: Criteria): Promise<Patient> {
    const { filter } = this.converter.criteria(criteria);
    const patient = await this.collection.findOne<Primitives<Patient>>(filter);
    return patient ? Patient.fromPrimitives(patient) : null;
  }
}
