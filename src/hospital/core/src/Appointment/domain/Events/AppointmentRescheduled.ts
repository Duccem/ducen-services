import { DomainEvent } from '@ducen/shared';

export type AppointmentReScheduledAttributes = {
  appointmentId: string;
  initDate: Date;
  endDate: Date;
  link: string;
};
export class AppointmentReScheduled extends DomainEvent {
  static readonly EVENT_NAME: string = 'appointment.rescheduled';
  private readonly attributes: AppointmentReScheduledAttributes;

  constructor(
    event: AppointmentReScheduledAttributes,
    aggregateId: string,
    eventId?: string,
    occurredOn?: Date
  ) {
    super(AppointmentReScheduled.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.attributes = event;
  }

  static fromPrimitives(data: {
    aggregateId: string;
    attributes: AppointmentReScheduledAttributes;
    eventId?: string;
    occurredOn?: Date;
  }): AppointmentReScheduled {
    const { aggregateId, attributes, occurredOn, eventId } = data;
    return new AppointmentReScheduled(attributes, aggregateId, eventId, occurredOn);
  }

  public toPrimitive(): AppointmentReScheduledAttributes {
    return this.attributes;
  }
}
