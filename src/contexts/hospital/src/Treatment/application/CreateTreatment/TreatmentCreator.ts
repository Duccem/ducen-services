import { Primitives } from '@ducen-services/shared';
import { Treatment } from '../../domain/Treatment';
import { TreatmentRepository } from '../../domain/TreatmentRepository';

export class TreatmentCreator {
  constructor(private readonly repository: TreatmentRepository) {}
  async run(data: Primitives<Treatment>) {
    const treatment = Treatment.Create(
      data.id,
      data.patientId,
      data.doctorId,
      data.diagnosticId,
      data.appointmentId,
      data.type,
      data.description,
      data.instructions,
      data.status,
      data.medicaments,
      data.startDate,
      data.endDate,
    );
    await this.repository.save(treatment);
  }
}
