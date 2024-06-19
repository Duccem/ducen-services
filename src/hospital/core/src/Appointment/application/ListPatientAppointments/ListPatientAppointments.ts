import { AppointmentRepository } from '../../domain/AppointmentRepository';
import { ByPatientIdCriteria } from '../../domain/Criteria/ByPatientIdCriteria';

export class ListPatientAppointments {
  constructor(protected readonly repository: AppointmentRepository) {}

  async run(patientId: string, limit: number, offset: number) {
    return this.repository.find(new ByPatientIdCriteria(patientId, limit, offset));
  }
}
