import { DateValueObject, Primitives, StringValueObject } from '@ducen-services/shared';
import { AppointmentTestAttribute } from './AppointmentTestAttribute';
import { AppointmentTestType } from './AppointmentTestType';

export class AppointmentTest {
  constructor(
    public type: AppointmentTestType,
    public laboratory: StringValueObject,
    public date: DateValueObject,
    public attributes: AppointmentTestAttribute[],
  ) {}

  public toPrimitives(): Primitives<AppointmentTest> {
    return {
      type: this.type.value,
      laboratory: this.laboratory.value,
      date: this.date.value,
      attributes: this.attributes.map((attribute) => attribute.toPrimitives()),
    };
  }

  static fromPrimitives(primitives: Primitives<AppointmentTest>): AppointmentTest {
    return new AppointmentTest(
      new AppointmentTestType(primitives.type),
      new StringValueObject(primitives.laboratory),
      new DateValueObject(primitives.date),
      primitives.attributes.map((attribute: Primitives<AppointmentTestAttribute>) =>
        AppointmentTestAttribute.fromPrimitives(attribute),
      ),
    );
  }

  static waitingForTests() {
    return [];
  }
}
