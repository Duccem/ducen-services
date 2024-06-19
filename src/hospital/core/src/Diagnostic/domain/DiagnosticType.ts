import { Enum } from '@ducen/shared';

export enum DiagnosticTypes {
  ALLERGY = 'ALLERGY',
  FAMILY = 'FAMILY',
  CHRONIC = 'CHRONIC',
  HABITS = 'HABITS',
}

export class DiagnosticType extends Enum<DiagnosticTypes> {
  constructor(value: DiagnosticTypes) {
    super(value, Object.values(DiagnosticTypes));
  }
}
