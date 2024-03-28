import { BaseObject, DateValueObject, Primitives, StringValueObject } from '@shared/core';

export class Association extends BaseObject {
  constructor(
    public entity: StringValueObject,
    public startDate: DateValueObject,
    public endDate: DateValueObject,
  ) {
    super();
  }

  toPrimitives(): Primitives<Association> {
    return {
      entity: this.entity.value,
      startDate: this.startDate.value,
      endDate: this.endDate.value,
    };
  }

  static fromPrimitives(data: Primitives<Association>): Association {
    return new Association(
      new StringValueObject(data.entity),
      new DateValueObject(data.startDate),
      new DateValueObject(data.endDate),
    );
  }
}
