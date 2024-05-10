import { Enum } from '@ducen-services/shared';

export enum MedicalTestTypes {
  BLOOD = 'blood',
  URINE = 'urine',
  STOOL = 'stool',
  OTHER = 'other',
}
export class MedicalTestType extends Enum<MedicalTestTypes> {
  constructor(value: MedicalTestTypes) {
    super(value, Object.values(MedicalTestTypes));
  }
}
