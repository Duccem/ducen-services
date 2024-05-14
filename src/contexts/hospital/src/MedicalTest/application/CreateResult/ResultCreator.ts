import { Primitives } from '@ducen-services/shared';
import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { MedicalTest } from '../../domain/MedicalTest';
import { MedicalTestRepository } from '../../domain/MedicalTestRepository';

export class ResultCreator {
  constructor(
    private readonly repository: MedicalTestRepository,
    private readonly patientSearcher: PatientSearcher,
  ) {}

  async run(data: Primitives<MedicalTest>) {
    await this.patientSearcher.run(data.patientId);
    const result = MedicalTest.Create(data.id, data.patientId, data.type, data.laboratory, data.date, data.attributes);
    await this.repository.save(result);
  }
}
