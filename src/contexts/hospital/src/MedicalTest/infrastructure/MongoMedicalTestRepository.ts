import { Logger, MongoConnection, MongoRepository, Primitives } from '@ducen-services/shared';
import { MedicalTest } from '../domain/MedicalTest';
import { MedicalTestRepository } from '../domain/MedicalTestRepository';

export class MongoMedicalTestRepository extends MongoRepository<MedicalTest> implements MedicalTestRepository {
  constructor(connection: MongoConnection, logger: Logger) {
    super(MedicalTest, connection, logger);
  }
  async index(): Promise<void> {
    await this.collection.createIndex({ patientId: 1 });
  }
  async save(result: MedicalTest): Promise<void> {
    await this.persist(result.id.toString(), result);
  }
  async search(patientId: string): Promise<MedicalTest[]> {
    const results = await this.collection.find<Primitives<MedicalTest>>({ patientId }).toArray();
    return results.map((result) => MedicalTest.fromPrimitives(result));
  }
}
