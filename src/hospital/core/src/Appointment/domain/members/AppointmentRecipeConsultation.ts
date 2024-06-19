import { DateValueObject, Primitives, StringValueObject } from '@ducen/shared';
import { AppointmentRecipe } from './AppointmentRecipe';
import { AppointmentRecipeType } from './AppointmentRecipeType';

export class AppointmentRecipeConsultation extends AppointmentRecipe {
  constructor(
    date: DateValueObject,
    endDate: DateValueObject,
    public reason: StringValueObject,
    public observations: StringValueObject
  ) {
    super(AppointmentRecipeType.consultation(), date, endDate);
  }

  toPrimitives(): Primitives<AppointmentRecipeConsultation> {
    return {
      type: this.type.getValue(),
      endDate: this.endDate.getValue(),
      date: this.date.getValue(),
      reason: this.reason.toString(),
      observations: this.observations.toString(),
    };
  }

  static fromPrimitives(primitive: Primitives<AppointmentRecipeConsultation>): AppointmentRecipeConsultation {
    return new AppointmentRecipeConsultation(
      new DateValueObject(primitive.date),
      new DateValueObject(primitive.endDate),
      new StringValueObject(primitive.reason),
      new StringValueObject(primitive.observations)
    );
  }
}
