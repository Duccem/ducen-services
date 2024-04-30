import { MongoRepository, Primitives, Uuid } from '@ducen-services/shared';
import { MedicalDocument } from '../../domain/MedicalDocument';
import { MedicalDocumentRepository } from '../../domain/MedicalDocumentRepository';

export class MongoMedicalDocumentRepository
  extends MongoRepository<MedicalDocument>
  implements MedicalDocumentRepository
{
  async index(): Promise<void> {
    await this.collection.createIndex({ id: 1 });
  }
  async findByPatientId(userId: Uuid): Promise<MedicalDocument[]> {
    const documents = await this.collection.findOne<Primitives<MedicalDocument>[]>({ userId: userId.toString() });
    return documents.map((document) => MedicalDocument.fromPrimitives(document));
  }

  async save(medicalDocument: MedicalDocument): Promise<void> {
    await this.persist(medicalDocument.id.toString(), medicalDocument);
  }
}
