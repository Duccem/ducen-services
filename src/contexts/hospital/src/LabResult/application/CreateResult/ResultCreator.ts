import { Primitives } from '@ducen-services/shared';
import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { LabResult } from '../../domain/LabResult';
import { LabResultRepository } from '../../domain/LabResultRepository';

export class ResultCreator {
  constructor(
    private readonly repository: LabResultRepository,
    private readonly patientSearcher: PatientSearcher,
  ) {}

  async run(data: Primitives<LabResult>) {
    await this.patientSearcher.run(data.patientId);
    const result = LabResult.Create(data.id, data.patientId, data.type, data.laboratory, data.date, data.attributes);
    await this.repository.save(result);
  }
}
