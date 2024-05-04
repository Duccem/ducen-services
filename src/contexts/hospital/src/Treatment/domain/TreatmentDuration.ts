import { NumberValueObject, Primitives } from '@ducen-services/shared';

export class TreatmentDuration {
  constructor(
    public years: NumberValueObject,
    public months: NumberValueObject,
    public weeks: NumberValueObject,
    public days: NumberValueObject,
  ) {}

  public toPrimitives(): Primitives<TreatmentDuration> {
    return {
      years: this.years.getValue(),
      months: this.months.getValue(),
      weeks: this.weeks.getValue(),
      days: this.days.getValue(),
    };
  }

  public static fromPrimitives(primitive: Primitives<TreatmentDuration>): TreatmentDuration {
    return new TreatmentDuration(
      new NumberValueObject(primitive.years),
      new NumberValueObject(primitive.months),
      new NumberValueObject(primitive.weeks),
      new NumberValueObject(primitive.days),
    );
  }
}
