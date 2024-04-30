import { Primitives, StringValueObject } from '@ducen-services/shared';

export class DemographicInformation {
  constructor(
    public civilStatus: CivilStatus,
    public occupation: Occupation,
    public educativeLevel: EducativeLevel,
  ) {}

  toPrimitives(): Primitives<DemographicInformation> {
    return {
      civilStatus: this.civilStatus.value,
      occupation: this.occupation.value,
      educativeLevel: this.educativeLevel.value,
    };
  }

  static fromPrimitives(primitives: Primitives<DemographicInformation>): DemographicInformation {
    return new DemographicInformation(
      new CivilStatus(primitives.civilStatus),
      new Occupation(primitives.occupation),
      new EducativeLevel(primitives.educativeLevel),
    );
  }
}

export class CivilStatus extends StringValueObject {}
export class Occupation extends StringValueObject {}
export class EducativeLevel extends StringValueObject {}
