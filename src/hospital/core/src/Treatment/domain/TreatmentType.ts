import { Enum } from '@ducen/shared';

export enum TreatmentTypes {
  CONSULTATION = 'consultation',
  SURGERY = 'surgery',
  MEDICATION = 'medication',
}

export class TreatmentType extends Enum<TreatmentTypes> {
  constructor(value: TreatmentTypes) {
    super(value, Object.values(TreatmentTypes));
  }
}
