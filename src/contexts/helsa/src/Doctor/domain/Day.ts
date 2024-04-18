import { BaseObject, Primitives, StringValueObject } from '@ducen/core';
import { Section } from './Section';

export class Day extends BaseObject {
  constructor(public weekDay: StringValueObject, public sections: Section[]) {
    super();
  }

  toPrimitives(): Primitives<Day> {
    return {
      weekDay: this.weekDay.value,
      sections: this.sections.map((section) => section.toPrimitives()),
    };
  }

  static fromPrimitives(data: Primitives<Day>): Day {
    return new Day(
      new StringValueObject(data.weekDay),
      data.sections.map((section: Primitives<Section>) => Section.fromPrimitives(section))
    );
  }
}
