import { Command } from '@ducen/shared';

export class FinishAppointmentCommand extends Command {
  constructor(public readonly appointmentId: string) {
    super();
  }
}
