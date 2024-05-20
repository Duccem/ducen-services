import { DateValueObject, Primitives, StringValueObject } from '@ducen-services/shared';
import { AppointmentRecipe } from './AppointmentRecipe';
import { AppointmentRecipeType } from './AppointmentRecipeType';

export class AppointmentRecipeConsultation extends AppointmentRecipe {
  constructor(
    date: DateValueObject,
    public reason: StringValueObject,
    public observations: StringValueObject,
  ) {
    super(AppointmentRecipeType.consultation(), date);
  }

  toPrimitives(): Primitives<AppointmentRecipeConsultation> {
    return {
      type: this.type.getValue(),
      date: this.date.getValue(),
      reason: this.reason.toString(),
      observations: this.observations.toString(),
    };
  }

  static fromPrimitives(primitive: Primitives<AppointmentRecipeConsultation>): AppointmentRecipeConsultation {
    return new AppointmentRecipeConsultation(
      new DateValueObject(primitive.date),
      new StringValueObject(primitive.reason),
      new StringValueObject(primitive.observations),
    );
  }
}
