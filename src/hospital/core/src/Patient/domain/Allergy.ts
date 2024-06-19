import { Enum, Primitives, StringValueObject, Uuid } from '@ducen/shared';
import { DiagnosticDate } from './DiagnosticDate';

export class Allergy {
  constructor(
    public name: AllergyName,
    public description: AllergyDescription,
    public severity: AllergySeverity,
    public reaction: AllergyReaction,
    public diagnosticDate: DiagnosticDate,
    public diagnosticId: Uuid
  ) {}

  public toPrimitives(): Primitives<Allergy> {
    return {
      name: this.name.value,
      description: this.description.value,
      severity: this.severity.value,
      reaction: this.reaction.value,
      diagnosticDate: this.diagnosticDate.value,
      diagnosticId: this.diagnosticId.value,
    };
  }

  static fromPrimitives(plain: Primitives<Allergy>): Allergy {
    return new Allergy(
      new AllergyName(plain.name),
      new AllergyDescription(plain.description),
      new AllergySeverity(plain.severity),
      new AllergyReaction(plain.reaction),
      new DiagnosticDate(plain.diagnosticDate),
      new Uuid(plain.diagnosticId)
    );
  }
}

export class AllergyDescription extends StringValueObject {}
export class AllergyName extends StringValueObject {}
export class AllergyReaction extends StringValueObject {}
export enum Severities {
  MILD = 'MILD',
  MODERATE = 'MODERATE',
  SEVERE = 'SEVERE',
}

export class AllergySeverity extends Enum<Severities> {
  constructor(value: Severities) {
    super(value, Object.values(Severities));
  }
}
