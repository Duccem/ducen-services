import { NumberValueObject, Primitives, StringValueObject } from '@ducen-services/shared';

export class Rating {
  constructor(
    public rate: NumberValueObject,
    public comment: StringValueObject,
  ) {}

  toPrimitives() {
    return {
      rate: this.rate.value,
      comment: this.comment.value,
    };
  }

  static fromPrimitives(primitives: Primitives<Rating>): Rating {
    return new Rating(new NumberValueObject(primitives.rate), new StringValueObject(primitives.comment));
  }

  static waitingForReview(): Rating {
    return new Rating(new NumberValueObject(0), new StringValueObject(''));
  }
}
