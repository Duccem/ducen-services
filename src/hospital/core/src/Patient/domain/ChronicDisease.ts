import { Enum, Primitives, StringValueObject, Uuid } from '@ducen/shared';
import { DiagnosticDate } from './DiagnosticDate';
import { DiseaseState } from './DiseaseState';

export class ChronicDisease {
  constructor(
    public type: ChronicDiseaseType,
    public description: ChronicDiseaseDescription,
    public actualState: DiseaseState,
    public diagnosticDate: DiagnosticDate,
    public diagnosticId: Uuid
  ) {}

  public toPrimitives(): Primitives<ChronicDisease> {
    return {
      type: this.type.value,
      description: this.description.value,
      actualState: this.actualState.value,
      diagnosticDate: this.diagnosticDate.value,
      diagnosticId: this.diagnosticId.value,
    };
  }

  static fromPrimitives(plain: Primitives<ChronicDisease>): ChronicDisease {
    return new ChronicDisease(
      new ChronicDiseaseType(plain.type),
      new ChronicDiseaseDescription(plain.description),
      new DiseaseState(plain.actualState),
      new DiagnosticDate(plain.diagnosticDate),
      new Uuid(plain.diagnosticId)
    );
  }
}

export class ChronicDiseaseDescription extends StringValueObject {}

export enum ChronicDiseaseTypes {
  GENETIC = 'GENETIC',
  AMBIENTAL = 'AMBIENTAL',
  HABITS = 'HABITS',
}
export class ChronicDiseaseType extends Enum<ChronicDiseaseTypes> {
  constructor(value: ChronicDiseaseTypes) {
    super(value, Object.values(ChronicDiseaseTypes));
  }
}
