import { Enum } from '@ducen-services/shared';

export enum TreatmentStatuses {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export class TreatmentStatus extends Enum<TreatmentStatuses> {
  constructor(value: TreatmentStatuses) {
    super(value, Object.values(TreatmentStatuses));
  }
}
