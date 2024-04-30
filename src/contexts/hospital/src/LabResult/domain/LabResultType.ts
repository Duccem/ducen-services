import { Enum } from '@ducen-services/shared';

export enum LabResultTypes {
  BLOOD = 'blood',
  URINE = 'urine',
  STOOL = 'stool',
  OTHER = 'other',
}
export class LabResultType extends Enum<LabResultTypes> {
  constructor(value: LabResultTypes) {
    super(value, Object.values(LabResultTypes));
  }
}
