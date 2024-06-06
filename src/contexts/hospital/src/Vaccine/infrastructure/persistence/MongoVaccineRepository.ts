import { Criteria, Logger, MongoConnection, MongoRepository } from '@ducen-services/shared';
import { Vaccine } from '../../domain/Vaccine';
import { VaccineRepository } from '../../domain/VaccineRepository';
import { MongoVaccineSchema } from './MongoVaccineSchema';

export class MongoVaccineRepository extends MongoRepository<Vaccine> implements VaccineRepository {
  constructor(connection: MongoConnection, logger: Logger) {
    super(Vaccine, connection, logger);
  }
  get schema() {
    return MongoVaccineSchema;
  }
  async save(vaccine: Vaccine): Promise<void> {
    await this.persist(vaccine.id.toString(), vaccine);
  }
  async listByCriteria(criteria: Criteria): Promise<Vaccine[]> {
    const vaccines = await this.searchByCriteria(criteria);
    return vaccines.map((vaccine) => Vaccine.fromPrimitives(vaccine));
  }
}
