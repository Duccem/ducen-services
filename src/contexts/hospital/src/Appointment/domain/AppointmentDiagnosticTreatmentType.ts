import { Enum } from '@ducen-services/shared';

export enum AppointmentDiagnosticTreatmentTypes {
  SURGERY = 'SURGERY',
  MEDICATION = 'MEDICATION',
  PHYSIOTHERAPY = 'PHYSIOTHERAPY',
  NO_TREATMENT = 'NO_TREATMENT',
}
export class AppointmentDiagnosticTreatmentType extends Enum<AppointmentDiagnosticTreatmentTypes> {
  constructor(value: AppointmentDiagnosticTreatmentTypes) {
    super(value, Object.values(AppointmentDiagnosticTreatmentTypes));
  }

  public static surgery(): AppointmentDiagnosticTreatmentType {
    return new AppointmentDiagnosticTreatmentType(AppointmentDiagnosticTreatmentTypes.SURGERY);
  }

  public static medication(): AppointmentDiagnosticTreatmentType {
    return new AppointmentDiagnosticTreatmentType(AppointmentDiagnosticTreatmentTypes.MEDICATION);
  }

  public static physiotherapy(): AppointmentDiagnosticTreatmentType {
    return new AppointmentDiagnosticTreatmentType(AppointmentDiagnosticTreatmentTypes.PHYSIOTHERAPY);
  }

  public static noTreatment(): AppointmentDiagnosticTreatmentType {
    return new AppointmentDiagnosticTreatmentType(AppointmentDiagnosticTreatmentTypes.NO_TREATMENT);
  }
}
