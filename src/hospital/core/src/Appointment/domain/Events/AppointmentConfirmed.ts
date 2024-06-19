import { DomainEvent } from '@ducen/shared';

export type AppointmentConfirmedAttributes = {
  appointmentId: string;
  initDate: Date;
};
export class AppointmentConfirmed extends DomainEvent {
  static readonly EVENT_NAME: string = 'appointment.confirmed';
  private readonly attributes: AppointmentConfirmedAttributes;

  constructor(
    event: AppointmentConfirmedAttributes,
    aggregateId: string,
    eventId?: string,
    occurredOn?: Date
  ) {
    super(AppointmentConfirmed.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.attributes = event;
  }

  static fromPrimitives(data: {
    aggregateId: string;
    attributes: AppointmentConfirmedAttributes;
    eventId?: string;
    occurredOn?: Date;
  }): AppointmentConfirmed {
    const { aggregateId, attributes, occurredOn, eventId } = data;
    return new AppointmentConfirmed(attributes, aggregateId, eventId, occurredOn);
  }

  public toPrimitive(): AppointmentConfirmedAttributes {
    return this.attributes;
  }
}
