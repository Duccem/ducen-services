import { DateValueObject, Primitives } from '@ducen-services/shared';
import { AppointmentRecipeType } from './AppointmentRecipeType';

export abstract class AppointmentRecipe {
  constructor(
    public type: AppointmentRecipeType,
    public date: DateValueObject,
    public endDate: DateValueObject,
  ) {}

  abstract toPrimitives(): any;
  static fromPrimitives: (primitive: Primitives<any>) => AppointmentRecipe;
  static waitingForRecipe: () => [];
}
