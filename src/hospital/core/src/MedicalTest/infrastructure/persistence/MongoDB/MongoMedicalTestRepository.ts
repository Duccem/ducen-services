import { Logger, MongoConnection, MongoRepository, Primitives } from '@ducen/shared';
import { MedicalTest } from '../../../domain/MedicalTest';
import { MedicalTestRepository } from '../../../domain/MedicalTestRepository';
import { MongoMedicalTestSchema } from './MongoMedicalTestSchema';

export class MongoMedicalTestRepository
  extends MongoRepository<MedicalTest>
  implements MedicalTestRepository
{
  constructor(connection: MongoConnection, logger: Logger) {
    super(MedicalTest, connection, logger);
  }
  get schema() {
    return MongoMedicalTestSchema;
  }
  async save(result: MedicalTest): Promise<void> {
    await this.persist(result.id.toString(), result);
  }
  async search(patientId: string): Promise<MedicalTest[]> {
    const results = await this.collection.find<Primitives<MedicalTest>>({ patientId });
    return results.map((result) => MedicalTest.fromPrimitives(result));
  }
}
