import { Criteria, EventBus, Operator, Primitives } from '@ducen-services/shared';
import { Doctor } from '../../domain/Doctor';
import { DoctorExistError } from '../../domain/DoctorExistError';
import { DoctorRepository } from '../../domain/DoctorRepository';

export class DoctorCreator {
  constructor(private repository: DoctorRepository, private eventBus: EventBus) {}

  async run(doctorBase: Primitives<Doctor>): Promise<void> {
    const verify = await this.repository.findDoctorByCriteria(
      Criteria.fromValues([
        {
          field: 'id',
          operator: Operator.EQUAL,
          value: doctorBase.id,
        },
      ])
    );
    if (verify) throw new DoctorExistError();

    const doctor = Doctor.create(
      doctorBase.id,
      doctorBase.user,
      doctorBase.specialty,
      doctorBase.medicalIdentificationNumber,
      doctorBase.licenseMedicalNumber,
      doctorBase.score,
      doctorBase.consultingRoomAddress,
      doctorBase.educations,
      doctorBase.experiences,
      doctorBase.associations,
      doctorBase.schedule,
      doctorBase.ratings
    );
    await this.repository.save(doctor);
    await this.eventBus.publish(doctor.pullDomainEvents());
  }
}
