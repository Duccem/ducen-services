import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { GetVaccinesByPatientIdCriteria } from '../../domain/GetVaccinesByPatientIdCriteria';
import { VaccineRepository } from '../../domain/VaccineRepository';

export class PatientVaccinesGetter {
  constructor(
    private readonly repository: VaccineRepository,
    private readonly patientSearcher: PatientSearcher,
  ) {}

  async run(patientId: string) {
    const patient = await this.patientSearcher.run(patientId);
    return this.repository.listByCriteria(new GetVaccinesByPatientIdCriteria(patient.id));
  }
}
