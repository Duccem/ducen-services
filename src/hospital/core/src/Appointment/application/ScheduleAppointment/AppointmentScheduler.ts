import { EventBus } from '@ducen/shared';
import { DoctorSearcher } from '../../../Doctor/application/SearchDoctor/DoctorSearcher';
import { PatientSearcher } from '../../../Patient/application/PatientSearcher/PatientSearcher';
import { Appointment } from '../../domain/Appointment';
import { AppointmentRepository } from '../../domain/AppointmentRepository';
import { RoomCallService } from '../../domain/RoomCallService';

export class AppointmentScheduler {
  constructor(
    private readonly appointmentRepository: AppointmentRepository,
    private readonly videoCallService: RoomCallService,
    private readonly patientSearcher: PatientSearcher,
    private readonly doctorSearcher: DoctorSearcher,
    private readonly eventBus: EventBus,
    private readonly appointmentUrl: string
  ) {}

  async run(
    appointmentId: string,
    patientId: string,
    doctorId: string,
    initDate: Date,
    endDate: Date,
    type: string
  ) {
    // Busca y comprueba que los participantes existan
    await Promise.allSettled([this.patientSearcher.run(patientId), this.doctorSearcher.run(doctorId)]);
    // Crea la sala de videoconferencia
    const roomToken = await this.videoCallService.generateToken(appointmentId);
    // Crea la cita
    const appointment = Appointment.Schedule(appointmentId, patientId, doctorId, type, initDate, endDate, {
      token: roomToken,
      room: `appointment-${appointmentId}`,
      url: `${this.appointmentUrl}/${appointmentId}`,
    });
    // Guarda la cita y publica los eventos
    await this.appointmentRepository.save(appointment);
    await this.eventBus.publish(appointment.pullDomainEvents());
  }
}
