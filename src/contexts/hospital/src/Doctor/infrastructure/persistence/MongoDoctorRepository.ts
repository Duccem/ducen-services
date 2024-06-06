import { Criteria, Logger, MongoConnection, MongoRepository, Primitives } from '@ducen-services/shared';
import { Doctor } from '../../domain/Doctor';
import { DoctorRepository } from '../../domain/DoctorRepository';
import { MongoDoctorSchema } from './MongoDoctorSchema';

export class MongoDoctorRepository extends MongoRepository<Doctor> implements DoctorRepository {
  constructor(connection: MongoConnection, logger: Logger) {
    super(Doctor, connection, logger);
  }
  get schema() {
    return MongoDoctorSchema;
  }
  async save(doctor: Doctor): Promise<void> {
    await this.persist(doctor.id.value, doctor);
  }
  async findDoctorByCriteria(criteria: Criteria): Promise<Doctor> {
    const { filter } = this.converter.criteria(criteria);
    const doctor = await this.collection.findOne<Primitives<Doctor>>(filter);
    return doctor ? Doctor.fromPrimitives(doctor) : null;
  }
  async listDoctorsByCriteria(criteria: Criteria): Promise<Doctor[]> {
    const results = await this.searchByCriteria(criteria);
    return results.map((doctor) => Doctor.fromPrimitives(doctor));
  }
  findNearDoctors(latitude: number, longitude: number, maxDistance: number): Promise<Doctor[]> {
    throw new Error('Method not implemented.');
  }
}
