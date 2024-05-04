import { Criteria, Logger, MongoConnection, MongoRepository, Primitives, Uuid } from '@ducen-services/shared';
import { Treatment } from '../domain/Treatment';
import { TreatmentRepository } from '../domain/TreatmentRepository';

export class MongoTreatmentRepository extends MongoRepository<Treatment> implements TreatmentRepository {
  constructor(connection: MongoConnection, logger: Logger) {
    super(Treatment, connection, logger);
  }
  async index(): Promise<void> {
    await this.collection.createIndex({ id: 1 });
  }
  async save(treatment: Treatment): Promise<void> {
    await this.persist(treatment.id.toString(), treatment);
  }
  async find(treatmentId: Uuid): Promise<Treatment> {
    const treatment = await this.collection.findOne<Primitives<Treatment>>({ id: treatmentId.toString() });
    if (!treatment) {
      return null;
    }
    return Treatment.fromPrimitives(treatment);
  }
  async search(criteria: Criteria): Promise<Treatment[]> {
    const treatments = await this.searchByCriteria(criteria);
    return treatments.map((treatment) => Treatment.fromPrimitives(treatment));
  }
}
