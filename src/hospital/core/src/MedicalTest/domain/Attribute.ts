import { Primitives, StringValueObject } from '@ducen/shared';

export class Attribute {
  constructor(
    public category: StringValueObject,
    public name: StringValueObject,
    public metric: StringValueObject,
    public unit: StringValueObject,
    public referenceRange: StringValueObject
  ) {}

  public toPrimitives(): Primitives<Attribute> {
    return {
      category: this.category.value,
      name: this.name.value,
      metric: this.metric.value,
      unit: this.unit.value,
      referenceRange: this.referenceRange.value,
    };
  }

  static fromPrimitives(primitives: Primitives<Attribute>): Attribute {
    return new Attribute(
      new StringValueObject(primitives.category),
      new StringValueObject(primitives.name),
      new StringValueObject(primitives.metric),
      new StringValueObject(primitives.unit),
      new StringValueObject(primitives.referenceRange)
    );
  }
}
