import { Enum } from '@ducen-services/shared';

export enum AppointmentStatuses {
  SCHEDULED = 'SCHEDULED',
  CANCELED = 'CANCELED',
  PROGRESS = 'PROGRESS',
  COMPLETED = 'COMPLETED',
  RESCHEDULED = 'RESCHEDULED',
}
export class AppointmentStatus extends Enum<AppointmentStatuses> {
  constructor(status: AppointmentStatuses) {
    super(status, Object.values(AppointmentStatuses));
  }

  public static scheduled(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatuses.SCHEDULED);
  }
}
