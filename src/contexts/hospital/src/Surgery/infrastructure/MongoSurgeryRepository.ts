import { MongoRepository, Primitives } from '@ducen-services/shared';
import { Surgery } from '../domain/Surgery';
import { SurgeryRepository } from '../domain/SurgeryRepository';

export class MongoSurgeryRepository extends MongoRepository<Surgery> implements SurgeryRepository {
  async index(): Promise<void> {
    await this.collection.createIndex({ id: 1 });
  }
  async save(surgery: Surgery): Promise<void> {
    await this.persist(surgery.id.toString(), surgery);
  }

  async searchByPatientId(patientId: string): Promise<Surgery[]> {
    const surgeries = await this.collection.find<Primitives<Surgery>>({ patientId }).toArray();
    return surgeries.map(Surgery.fromPrimitives);
  }
}
