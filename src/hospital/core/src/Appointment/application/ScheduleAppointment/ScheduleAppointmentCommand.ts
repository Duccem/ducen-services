import { Command } from '@ducen/shared';

export class ScheduleAppointmentCommand extends Command {
  constructor(
    public data: {
      appointmentId: string;
      patientId: string;
      doctorId: string;
      initDate: Date;
      endDate: Date;
      type: string;
    }
  ) {
    super();
  }
}
