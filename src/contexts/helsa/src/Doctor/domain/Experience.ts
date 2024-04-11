import { BaseObject, DateValueObject, Primitives, StringValueObject } from '@ducen/core';

export class Experience extends BaseObject {
  constructor(
    public title: StringValueObject,
    public institution: StringValueObject,
    public startDate: DateValueObject,
    public endDate: DateValueObject
  ) {
    super();
  }

  toPrimitives(): Primitives<Experience> {
    return {
      title: this.title.value,
      institution: this.institution.value,
      startDate: this.startDate.value,
      endDate: this.endDate.value,
    };
  }

  static fromPrimitives(data: Primitives<Experience>): Experience {
    return new Experience(
      new StringValueObject(data.title),
      new StringValueObject(data.institution),
      new DateValueObject(data.startDate),
      new DateValueObject(data.endDate)
    );
  }
}
