import { DateValueObject, Primitives, StringValueObject } from '@ducen-services/shared';
import { AppointmentRecipe } from './AppointmentRecipe';
import { AppointmentRecipeType } from './AppointmentRecipeType';

export class AppointmentRecipeTest extends AppointmentRecipe {
  constructor(
    date: DateValueObject,
    public exams: StringValueObject[],
  ) {
    super(AppointmentRecipeType.test(), date);
  }

  toPrimitives() {
    return {
      type: this.type.getValue(),
      date: this.date.getValue(),
      exams: this.exams.map((exam) => exam.toString()),
    };
  }

  static fromPrimitives(primitive: Primitives<AppointmentRecipeTest>): AppointmentRecipeTest {
    return new AppointmentRecipeTest(
      new DateValueObject(primitive.date),
      primitive.exams.map((exam) => new StringValueObject(exam)),
    );
  }
}
