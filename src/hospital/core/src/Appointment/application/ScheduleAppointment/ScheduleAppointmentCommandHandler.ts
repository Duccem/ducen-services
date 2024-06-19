import { Command, CommandHandler, EventBus } from '@ducen/shared';
import { DoctorSearcher } from '../../../Doctor/application/SearchDoctor/DoctorSearcher';
import { DoctorRepository } from '../../../Doctor/domain/DoctorRepository';
import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { PatientRepository } from '../../../Patient/domain/PatientRepository';
import { AppointmentRepository } from '../../domain/AppointmentRepository';
import { RoomCallService } from '../../domain/RoomCallService';
import { AppointmentScheduler } from './AppointmentScheduler';
import { ScheduleAppointmentCommand } from './ScheduleAppointmentCommand';

export class ScheduleAppointmentCommandHandler implements CommandHandler<ScheduleAppointmentCommand> {
  private scheduler: AppointmentScheduler;
  constructor(
    appointmentRepository: AppointmentRepository,
    videoCallService: RoomCallService,
    patientRepository: PatientRepository,
    doctorRepository: DoctorRepository,
    eventBus: EventBus,
    appointmentUrl: string
  ) {
    this.scheduler = new AppointmentScheduler(
      appointmentRepository,
      videoCallService,
      new PatientSearcher(patientRepository),
      new DoctorSearcher(doctorRepository),
      eventBus,
      appointmentUrl
    );
  }

  subscribedTo(): Command {
    return ScheduleAppointmentCommand;
  }

  public async handle({ data }: ScheduleAppointmentCommand): Promise<void> {
    await this.scheduler.run(
      data.appointmentId,
      data.patientId,
      data.doctorId,
      new Date(data.initDate),
      new Date(data.endDate),
      data.type
    );
  }
}
