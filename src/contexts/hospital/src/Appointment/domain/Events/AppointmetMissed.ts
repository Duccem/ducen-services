import { DomainEvent } from '@ducen-services/shared';

export type AppointmentMissedAttributes = {
  appointmentId: string;
  endDate: Date;
};
export class AppointmentMissed extends DomainEvent {
  static readonly EVENT_NAME: string = 'appointment.missed';
  private readonly attributes: AppointmentMissedAttributes;

  constructor(event: AppointmentMissedAttributes, aggregateId: string, eventId?: string, occurredOn?: Date) {
    super(AppointmentMissed.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.attributes = event;
  }

  static fromPrimitives(data: {
    aggregateId: string;
    attributes: AppointmentMissedAttributes;
    eventId?: string;
    occurredOn?: Date;
  }): AppointmentMissed {
    const { aggregateId, attributes, occurredOn, eventId } = data;
    return new AppointmentMissed(attributes, aggregateId, eventId, occurredOn);
  }

  public toPrimitive(): AppointmentMissedAttributes {
    return this.attributes;
  }
}
