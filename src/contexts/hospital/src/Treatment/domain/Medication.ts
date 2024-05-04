import { Primitives, StringValueObject } from '@ducen-services/shared';

export class Medication {
  constructor(
    public name: StringValueObject,
    public dose: StringValueObject,
    public frequency: StringValueObject,
    public compounds: StringValueObject[],
  ) {}

  public toPrimitives(): Primitives<Medication> {
    return {
      name: this.name.toString(),
      dose: this.dose.toString(),
      frequency: this.frequency.toString(),
      compounds: this.compounds.map((compound) => compound.toString()),
    };
  }

  public static fromPrimitive(primitive: Primitives<Medication>): Medication {
    return new Medication(
      new StringValueObject(primitive.name),
      new StringValueObject(primitive.dose),
      new StringValueObject(primitive.frequency),
      primitive.compounds.map((compound) => new StringValueObject(compound)),
    );
  }
}
