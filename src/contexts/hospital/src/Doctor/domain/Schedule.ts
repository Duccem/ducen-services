import { BaseObject, NumberValueObject, Primitives } from '@ducen-services/shared';
import { Day } from './Day';

export class Schedule extends BaseObject {
  constructor(
    public days: Day[],
    public appointmentDuration: NumberValueObject,
    public maxAppointmentsPerDay: NumberValueObject,
  ) {
    super();
  }

  toPrimitives(): Primitives<Schedule> {
    return {
      days: this.days.map((day) => day.toPrimitives()),
      appointmentDuration: this.appointmentDuration.value,
      maxAppointmentsPerDay: this.maxAppointmentsPerDay.value,
    };
  }

  static fromPrimitives(data: Primitives<Schedule>): Schedule {
    return new Schedule(
      data.days.map((day: Primitives<Day>) => Day.fromPrimitives(day)),
      new NumberValueObject(data.appointmentDuration),
      new NumberValueObject(data.maxAppointmentsPerDay),
    );
  }
}
