import { DateValueObject, Primitives, StringValueObject } from '@ducen/shared';
import { AppointmentRecipe } from './AppointmentRecipe';
import { AppointmentRecipeType } from './AppointmentRecipeType';

export class AppointmentRecipeTest extends AppointmentRecipe {
  constructor(date: DateValueObject, endDate: DateValueObject, public exams: StringValueObject[]) {
    super(AppointmentRecipeType.test(), date, endDate);
  }

  toPrimitives() {
    return {
      type: this.type.getValue(),
      date: this.date.getValue(),
      endDate: this.endDate.getValue(),
      exams: this.exams.map((exam) => exam.toString()),
    };
  }

  static fromPrimitives(primitive: Primitives<AppointmentRecipeTest>): AppointmentRecipeTest {
    return new AppointmentRecipeTest(
      new DateValueObject(primitive.date),
      new DateValueObject(primitive.endDate),
      primitive.exams.map((exam) => new StringValueObject(exam))
    );
  }
}
