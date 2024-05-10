import { Enum } from '@ducen-services/shared';

export enum AppointmentTestTypes {
  BLOOD_TEST = 'BLOOD_TEST',
  URINE_TEST = 'URINE_TEST',
  XRAY = 'XRAY',
}
export class AppointmentTestType extends Enum<AppointmentTestTypes> {
  constructor(type: AppointmentTestTypes) {
    super(type, Object.values(AppointmentTestTypes));
  }
}
