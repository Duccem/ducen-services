import { NumberValueObject, Primitives, StringValueObject } from '@ducen/shared';

export class AppointmentRating {
  constructor(public rate: NumberValueObject, public comment: StringValueObject) {}

  toPrimitives() {
    return {
      rate: this.rate.value,
      comment: this.comment.value,
    };
  }

  static fromPrimitives(primitives: Primitives<AppointmentRating>): AppointmentRating {
    return new AppointmentRating(
      new NumberValueObject(primitives.rate),
      new StringValueObject(primitives.comment)
    );
  }

  static waitingForReview(): AppointmentRating {
    return new AppointmentRating(new NumberValueObject(0), new StringValueObject(''));
  }
}
