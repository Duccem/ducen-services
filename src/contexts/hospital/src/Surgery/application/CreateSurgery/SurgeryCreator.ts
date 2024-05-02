import { Primitives } from '@ducen-services/shared';
import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { Surgery } from '../../domain/Surgery';
import { SurgeryRepository } from '../../domain/SurgeryRepository';

export class SurgeryCreator {
  constructor(
    private readonly repository: SurgeryRepository,
    private readonly patientSearcher: PatientSearcher,
  ) {}

  async run(data: Primitives<Surgery>) {
    await this.patientSearcher.run(data.patientId);
    const surgery = Surgery.Create(
      data.id,
      data.patientId,
      new Date(data.date),
      data.type,
      data.details,
      data.surgeon,
      data.clinic,
    );
    await this.repository.save(surgery);
  }
}
