import { Enum } from '@ducen/shared';

export enum AppointmentStatuses {
  SCHEDULED = 'SCHEDULED',
  RESCHEDULED = 'RESCHEDULED',
  CONFIRMED = 'CONFIRMED',
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
  public static rescheduled(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatuses.RESCHEDULED);
  }
  public static late(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatuses.LATE);
  }
  public static cancelled(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatuses.CANCELLED);
  }
  public static waitingDoctor(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatuses.WAITING_DOCTOR);
  }
  public static waitingPatient(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatuses.WAITING_PATIENT);
  }
  public static started(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatuses.STARTED);
  }
  public static missed(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatuses.MISSED);
  }
  public static finished(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatuses.FINISHED);
  }

  public static confirmed(): AppointmentStatus {
    return new AppointmentStatus(AppointmentStatuses.CONFIRMED);
  }
}
