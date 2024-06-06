import { Logger, MongoConnection, MongoRepository, Primitives, Uuid } from '@ducen-services/shared';
import { MedicalDocument } from '../../../domain/MedicalDocument';
import { MedicalDocumentRepository } from '../../../domain/MedicalDocumentRepository';
import { MongoMedicalDocumentSchema } from './MongoMedicalDocumentSchema';

export class MongoMedicalDocumentRepository
  extends MongoRepository<MedicalDocument>
  implements MedicalDocumentRepository
{
  constructor(connection: MongoConnection, logger: Logger) {
    super(MedicalDocument, connection, logger);
  }

  get schema() {
    return MongoMedicalDocumentSchema;
  }

  async findByPatientId(userId: Uuid): Promise<MedicalDocument[]> {
    const documents = await this.collection.find<Primitives<MedicalDocument>>({ userId: userId.toString() });
    return documents.map((document) => MedicalDocument.fromPrimitives(document));
  }

  async save(medicalDocument: MedicalDocument): Promise<void> {
    await this.persist(medicalDocument.id.toString(), medicalDocument);
  }
}
