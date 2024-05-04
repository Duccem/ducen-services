import { Logger, MongoConnection, MongoRepository, Primitives, Uuid } from '@ducen-services/shared';
import { Diagnostic } from '../domain/Diagnostic';
import { DiagnosticRepository } from '../domain/DiagnosticRepository';

export class MongoDiagnosticRepository extends MongoRepository<Diagnostic> implements DiagnosticRepository {
  constructor(connection: MongoConnection, logger: Logger) {
    super(Diagnostic, connection, logger);
  }
  async index(): Promise<void> {
    await this.collection.createIndex({ id: 1 });
  }
  async save(diagnostic: Diagnostic): Promise<void> {
    await this.persist(diagnostic.id.toString(), diagnostic);
  }
  async searchByPatientId(patientId: Uuid): Promise<Diagnostic[]> {
    const result = await this.collection.find<Primitives<Diagnostic>>({ patientId: patientId.toString() }).toArray();
    return result.map((data) => Diagnostic.fromPrimitives(data));
  }
}
