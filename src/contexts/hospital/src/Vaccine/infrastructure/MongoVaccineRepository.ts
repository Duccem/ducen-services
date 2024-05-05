import { Criteria, Logger, MongoConnection, MongoRepository } from '@ducen-services/shared';
import { Vaccine } from '../domain/Vaccine';
import { VaccineRepository } from '../domain/VaccineRepository';

export class MongoVaccineRepository extends MongoRepository<Vaccine> implements VaccineRepository {
  constructor(connection: MongoConnection, logger: Logger) {
    super(Vaccine, connection, logger);
  }
  async index(): Promise<void> {
    await this.collection.createIndex({ id: 1 });
  }
  async save(vaccine: Vaccine): Promise<void> {
    await this.persist(vaccine.id.toString(), vaccine);
  }
  async listByCriteria(criteria: Criteria): Promise<Vaccine[]> {
    const vaccines = await this.searchByCriteria(criteria);
    return vaccines.map((vaccine) => Vaccine.fromPrimitives(vaccine));
  }
}
