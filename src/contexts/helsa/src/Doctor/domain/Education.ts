import { BaseObject, DateValueObject, Primitives, StringValueObject } from '@shared/core';

export class Education extends BaseObject {
  constructor(
    public title: StringValueObject,
    public institution: StringValueObject,
    public startDate: DateValueObject,
    public endDate: DateValueObject,
    public type: StringValueObject,
  ) {
    super();
  }

  toPrimitives(): Primitives<Education> {
    return {
      title: this.title.value,
      institution: this.institution.value,
      startDate: this.startDate.value,
      endDate: this.endDate.value,
      type: this.type.value,
    };
  }

  static fromPrimitives(data: Primitives<Education>): Education {
    return new Education(
      new StringValueObject(data.title),
      new StringValueObject(data.institution),
      new DateValueObject(data.startDate),
      new DateValueObject(data.endDate),
      new StringValueObject(data.type),
    );
  }
}
