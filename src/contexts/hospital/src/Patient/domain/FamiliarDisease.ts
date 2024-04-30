import { Enum, NumberValueObject, Primitives, StringValueObject, Uuid } from '@ducen-services/shared';
import { DiseaseState } from './DiseaseState';

export class FamiliarDisease {
  constructor(
    public type: FamiliarDiseaseType,
    public name: StringValueObject,
    public description: StringValueObject,
    public relation: FamiliarDiseaseRelation,
    public diagnosisAge: NumberValueObject,
    public actualState: DiseaseState,
    public diagnosticId: Uuid,
  ) {}
  public toPrimitives() {
    return {
      name: this.name.toString(),
      description: this.description.toString(),
      relation: this.relation.getValue(),
      diagnosisAge: this.diagnosisAge.value,
      actualState: this.actualState.getValue(),
      type: this.type.getValue(),
      diagnosticId: this.diagnosticId.value,
    };
  }

  static fromPrimitives(primitives: Primitives<FamiliarDisease>): FamiliarDisease {
    return new FamiliarDisease(
      new FamiliarDiseaseType(primitives.type),
      new StringValueObject(primitives.name),
      new StringValueObject(primitives.description),
      new FamiliarDiseaseRelation(primitives.relation),
      new NumberValueObject(primitives.diagnosisAge),
      new DiseaseState(primitives.actualState),
      new Uuid(primitives.diagnosticId),
    );
  }
}

export enum FamiliarDiseaseTypes {
  Diabetes = 'Diabetes',
  Hypertension = 'Hypertension',
  Cancer = 'Cancer',
  HeartDisease = 'Heart Disease',
  Stroke = 'Stroke',
  Tuberculosis = 'Tuberculosis',
  Asthma = 'Asthma',
  Allergy = 'Allergy',
  Other = 'Other',
}
export enum FamiliarDiseaseRelations {
  Father = 'Father',
  Mother = 'Mother',
  Brother = 'Brother',
  Sister = 'Sister',
  Grandfather = 'Grandfather',
  Grandmother = 'Grandmother',
  Uncle = 'Uncle',
  Aunt = 'Aunt',
  Cousin = 'Cousin',
  Other = 'Other',
}
export class FamiliarDiseaseType extends Enum<FamiliarDiseaseTypes> {
  constructor(type: FamiliarDiseaseTypes) {
    super(type, Object.values(FamiliarDiseaseTypes));
  }
}
export class FamiliarDiseaseRelation extends Enum<FamiliarDiseaseRelations> {
  constructor(relation: FamiliarDiseaseRelations) {
    super(relation, Object.values(FamiliarDiseaseRelations));
  }
}
