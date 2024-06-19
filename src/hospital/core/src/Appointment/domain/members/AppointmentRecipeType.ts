import { Enum } from '@ducen/shared';

export enum AppointmentRecipeTypes {
  TEST = 'TEST',
  SURGERY = 'SURGERY',
  CONSULTATION = 'CONSULTATION',
  PRESCRIPTION = 'PRESCRIPTION',
}

export class AppointmentRecipeType extends Enum<AppointmentRecipeTypes> {
  constructor(value: AppointmentRecipeTypes) {
    super(value, Object.values(AppointmentRecipeTypes));
  }
  static test(): AppointmentRecipeType {
    return new AppointmentRecipeType(AppointmentRecipeTypes.TEST);
  }
  static surgery(): AppointmentRecipeType {
    return new AppointmentRecipeType(AppointmentRecipeTypes.SURGERY);
  }
  static consultation(): AppointmentRecipeType {
    return new AppointmentRecipeType(AppointmentRecipeTypes.CONSULTATION);
  }
  static prescription(): AppointmentRecipeType {
    return new AppointmentRecipeType(AppointmentRecipeTypes.PRESCRIPTION);
  }
}
