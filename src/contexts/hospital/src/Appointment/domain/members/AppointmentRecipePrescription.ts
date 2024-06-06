import { DateValueObject, Primitives, StringValueObject } from '@ducen-services/shared';
import { AppointmentRecipe } from './AppointmentRecipe';
import { AppointmentRecipeType } from './AppointmentRecipeType';

export class AppointmentRecipePrescription extends AppointmentRecipe {
  constructor(
    date: DateValueObject,
    endDate: DateValueObject,
    public instructions: StringValueObject[],
    public medications: StringValueObject[],
  ) {
    super(AppointmentRecipeType.prescription(), date, endDate);
  }

  toPrimitives(): Primitives<AppointmentRecipePrescription> {
    return {
      type: this.type.getValue(),
      date: this.date.getValue(),
      endDate: this.endDate.getValue(),
      instructions: this.instructions.map((instruction) => instruction.toString()),
      medications: this.medications.map((medication) => medication.toString()),
    };
  }

  static fromPrimitives(primitive: Primitives<AppointmentRecipePrescription>): AppointmentRecipePrescription {
    return new AppointmentRecipePrescription(
      new DateValueObject(primitive.date),
      new DateValueObject(primitive.endDate),
      primitive.instructions.map((instruction) => new StringValueObject(instruction)),
      primitive.medications.map((medication) => new StringValueObject(medication)),
    );
  }
}
