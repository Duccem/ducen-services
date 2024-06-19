import { Logger, MongoConnection, MongoRepository, Primitives } from '@ducen/shared';
import { Surgery } from '../../domain/Surgery';
import { SurgeryRepository } from '../../domain/SurgeryRepository';
import { MongoSurgerySchema } from './MongoSurgerySchema';

export class MongoSurgeryRepository extends MongoRepository<Surgery> implements SurgeryRepository {
  constructor(connection: MongoConnection, logger: Logger) {
    super(Surgery, connection, logger);
  }

  get schema() {
    return MongoSurgerySchema;
  }
  async save(surgery: Surgery): Promise<void> {
    await this.persist(surgery.id.toString(), surgery);
  }

  async searchByPatientId(patientId: string): Promise<Surgery[]> {
    const surgeries = await this.collection.find<Primitives<Surgery>>({ patientId });
    return surgeries.map(Surgery.fromPrimitives);
  }
}
