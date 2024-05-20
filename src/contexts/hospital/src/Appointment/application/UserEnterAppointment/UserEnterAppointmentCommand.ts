import { Command } from '@ducen-services/shared';

export class UserEnterAppointmentCommand extends Command {
  constructor(
    public readonly appointmentId: string,
    public readonly whoEnter: 'PATIENT' | 'DOCTOR',
  ) {
    super();
  }
}
