import { NumberValueObject, Primitives, StringValueObject } from '@ducen-services/shared';

export class Medication {
  constructor(
    public name: StringValueObject,
    public dose: StringValueObject,
    public frequency: StringValueObject,
    public duration: NumberValueObject,
  ) {}

  public toPrimitives(): Primitives<Medication> {
    return {
      name: this.name.toString(),
      dose: this.dose.toString(),
      frequency: this.frequency.toString(),
      duration: this.duration.getValue(),
    };
  }

  public static fromPrimitive(primitive: Primitives<Medication>): Medication {
    return new Medication(
      new StringValueObject(primitive.name),
      new StringValueObject(primitive.dose),
      new StringValueObject(primitive.frequency),
      new NumberValueObject(primitive.duration),
    );
  }
}
