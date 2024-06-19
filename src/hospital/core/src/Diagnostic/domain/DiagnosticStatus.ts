import { Enum } from '@ducen/shared';

export enum DiagnosticStatuses {
  ACTIVE = 'active',
  OBSOLETE = 'obsolete',
}
export class DiagnosticStatus extends Enum<DiagnosticStatuses> {
  constructor(value: DiagnosticStatuses) {
    super(value, Object.values(DiagnosticStatuses));
  }
}
