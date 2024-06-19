import { DomainEvent } from '@ducen/shared';

export type AppointmentIsLateAttributes = {
  appointmentId: string;
  initDate: Date;
  link: string;
};
export class AppointmentIsLate extends DomainEvent {
  static readonly EVENT_NAME: string = 'appointment.late';
  private readonly attributes: AppointmentIsLateAttributes;

  constructor(event: AppointmentIsLateAttributes, aggregateId: string, eventId?: string, occurredOn?: Date) {
    super(AppointmentIsLate.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.attributes = event;
  }

  static fromPrimitives(data: {
    aggregateId: string;
    attributes: AppointmentIsLateAttributes;
    eventId?: string;
    occurredOn?: Date;
  }): AppointmentIsLate {
    const { aggregateId, attributes, occurredOn, eventId } = data;
    return new AppointmentIsLate(attributes, aggregateId, eventId, occurredOn);
  }

  public toPrimitive(): AppointmentIsLateAttributes {
    return this.attributes;
  }
}
