import { Command } from '@ducen-services/shared';

export class RescheduleAppointmentCommand extends Command {
  constructor(
    public readonly appointmentId: string,
    public readonly initDate: Date,
    public readonly endDate: Date,
  ) {
    super();
  }
}
