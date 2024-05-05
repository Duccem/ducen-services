import { Primitives } from '@ducen-services/shared';
import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { Vaccine } from '../../domain/Vaccine';
import { VaccineRepository } from '../../domain/VaccineRepository';

export class VaccineCreator {
  constructor(
    private readonly repository: VaccineRepository,
    private readonly patientSearcher: PatientSearcher,
  ) {}

  async run(data: Primitives<Vaccine>) {
    const patient = await this.patientSearcher.run(data.patientId);
    const vaccine = Vaccine.Create(
      data.id,
      patient.id.toString(),
      data.name,
      data.dose,
      data.date,
      data.notes,
      data.nextDose,
      data.effective,
      data.required,
    );
    await this.repository.save(vaccine);
  }
}
