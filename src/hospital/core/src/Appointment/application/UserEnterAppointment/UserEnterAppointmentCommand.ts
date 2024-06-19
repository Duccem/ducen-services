import { Command } from '@ducen/shared';

export class UserEnterAppointmentCommand extends Command {
  constructor(public readonly appointmentId: string, public readonly whoEnter: 'PATIENT' | 'DOCTOR') {
    super();
  }
}
