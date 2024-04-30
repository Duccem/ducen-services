import { Enum } from '@ducen-services/shared';

export enum DiseaseStates {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  CONTROLLED = 'controlled',
}
export class DiseaseState extends Enum<DiseaseStates> {
  constructor(value: DiseaseStates) {
    super(value, Object.values(DiseaseStates));
  }
}
