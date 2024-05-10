import { Primitives, StringValueObject } from '@ducen-services/shared';

export class AppointmentTestAttribute {
  constructor(
    public category: StringValueObject,
    public name: StringValueObject,
    public metric: StringValueObject,
    public unit: StringValueObject,
    public referenceRange: StringValueObject,
  ) {}

  public toPrimitives(): Primitives<AppointmentTestAttribute> {
    return {
      category: this.category.value,
      name: this.name.value,
      metric: this.metric.value,
      unit: this.unit.value,
      referenceRange: this.referenceRange.value,
    };
  }

  static fromPrimitives(primitives: Primitives<AppointmentTestAttribute>): AppointmentTestAttribute {
    return new AppointmentTestAttribute(
      new StringValueObject(primitives.category),
      new StringValueObject(primitives.name),
      new StringValueObject(primitives.metric),
      new StringValueObject(primitives.unit),
      new StringValueObject(primitives.referenceRange),
    );
  }
}
