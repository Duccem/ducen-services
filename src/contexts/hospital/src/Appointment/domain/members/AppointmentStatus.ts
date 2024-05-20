import { Enum } from '@ducen-services/shared';

export enum AppointmentStatuses {
  SCHEDULED = 'SCHEDULED',
  RESCHEDULED = 'RESCHEDULED',
  LATE = 'LATE',
  CANCELLED = 'CANCELLED',
  WAITING_DOCTOR = 'WAITING_DOCTOR',
  WAITING_PATIENT = 'WAITING_PATIENT',
  STARTED = 'STARTED',
  MISSED = 'MISSED',
  FINISHED = 'FINISHED',
}
export class AppointmentStatus extends Enum<AppointmentStatuses> {
  constructor(status: AppointmentStatuses) {
    super(status, Object.values(AppointmentStatuses));
  }

  public static scheduled(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatuses.SCHEDULED);
  }
}
