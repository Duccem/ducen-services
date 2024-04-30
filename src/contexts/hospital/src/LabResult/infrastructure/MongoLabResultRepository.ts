import { Logger, MongoConnection, MongoRepository, Primitives } from '@ducen-services/shared';
import { LabResult } from '../domain/LabResult';
import { LabResultRepository } from '../domain/LabResultRepository';

export class MongoLabResultRepository extends MongoRepository<LabResult> implements LabResultRepository {
  constructor(connection: MongoConnection, logger: Logger) {
    super(LabResult, connection, logger);
  }
  async index(): Promise<void> {
    await this.collection.createIndex({ patientId: 1 });
  }
  async save(result: LabResult): Promise<void> {
    await this.persist(result.id.toString(), result);
  }
  async search(patientId: string): Promise<LabResult[]> {
    const results = await this.collection.find<Primitives<LabResult>>({ patientId }).toArray();
    return results.map((result) => LabResult.fromPrimitives(result));
  }
}
