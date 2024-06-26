import { Logger, MongoConnection, MongoRepository, Primitives, Uuid } from '@ducen/shared';
import { Diagnostic } from '../../domain/Diagnostic';
import { DiagnosticRepository } from '../../domain/DiagnosticRepository';
import { MongoDiagnosticSchema } from './MongoDiagnosticSchema';

export class MongoDiagnosticRepository extends MongoRepository<Diagnostic> implements DiagnosticRepository {
  constructor(connection: MongoConnection, logger: Logger) {
    super(Diagnostic, connection, logger);
  }
  get schema() {
    return MongoDiagnosticSchema;
  }
  async save(diagnostic: Diagnostic): Promise<void> {
    await this.persist(diagnostic.id.toString(), diagnostic);
  }
  async searchByPatientId(patientId: Uuid): Promise<Diagnostic[]> {
    const result = await this.collection.find<Primitives<Diagnostic>>({ patientId: patientId.toString() });
    return result.map((data) => Diagnostic.fromPrimitives(data));
  }
}
