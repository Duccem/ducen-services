import { BaseObject, DateValueObject, Primitives } from '@ducen/shared';

export class Section extends BaseObject {
  constructor(public initHour: DateValueObject, public endHour: DateValueObject) {
    super();
  }

  toPrimitives(): Primitives<Section> {
    return {
      initHour: this.initHour.value,
      endHour: this.endHour.value,
    };
  }

  static fromPrimitives(data: Primitives<Section>): Section {
    return new Section(new DateValueObject(data.initHour), new DateValueObject(data.endHour));
  }
}
