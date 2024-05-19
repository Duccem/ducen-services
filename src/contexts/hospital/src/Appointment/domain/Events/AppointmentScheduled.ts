import { DomainEvent } from '@ducen-services/shared';

export type AppointmentScheduledAttributes = {
  appointmentId: string;
  patientId: string;
  doctorId: string;
  initDate: Date;
  endDate: Date;
  link: string;
};
export class AppointmentScheduled extends DomainEvent {
  static readonly EVENT_NAME: string = 'appointment.scheduled';
  private readonly attributes: AppointmentScheduledAttributes;

  constructor(event: AppointmentScheduledAttributes, aggregateId: string, eventId?: string, occurredOn?: Date) {
    super(AppointmentScheduled.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.attributes = event;
  }

  static fromPrimitives(data: {
    aggregateId: string;
    attributes: AppointmentScheduledAttributes;
    eventId?: string;
    occurredOn?: Date;
  }): AppointmentScheduled {
    const { aggregateId, attributes, occurredOn, eventId } = data;
    return new AppointmentScheduled(attributes, aggregateId, eventId, occurredOn);
  }

  public toPrimitive(): AppointmentScheduledAttributes {
    return this.attributes;
  }
}
