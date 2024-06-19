import { DomainEvent } from '@ducen/shared';

export type AppointmentStartedAttributes = {
  appointmentId: string;
};
export class AppointmentStarted extends DomainEvent {
  static readonly EVENT_NAME: string = 'appointment.started';
  private readonly attributes: AppointmentStartedAttributes;

  constructor(event: AppointmentStartedAttributes, aggregateId: string, eventId?: string, occurredOn?: Date) {
    super(AppointmentStarted.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.attributes = event;
  }

  static fromPrimitives(data: {
    aggregateId: string;
    attributes: AppointmentStartedAttributes;
    eventId?: string;
    occurredOn?: Date;
  }): AppointmentStarted {
    const { aggregateId, attributes, occurredOn, eventId } = data;
    return new AppointmentStarted(attributes, aggregateId, eventId, occurredOn);
  }

  public toPrimitive(): AppointmentStartedAttributes {
    return this.attributes;
  }
}
