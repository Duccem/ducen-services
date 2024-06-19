import { DomainEvent } from '@ducen/shared';

export type AppointmentCancelledAttributes = {
  appointmentId: string;
  initDate: Date;
  cancelReason: string;
};
export class AppointmentCancelled extends DomainEvent {
  static readonly EVENT_NAME: string = 'appointment.cancelled';
  private readonly attributes: AppointmentCancelledAttributes;

  constructor(
    event: AppointmentCancelledAttributes,
    aggregateId: string,
    eventId?: string,
    occurredOn?: Date
  ) {
    super(AppointmentCancelled.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.attributes = event;
  }

  static fromPrimitives(data: {
    aggregateId: string;
    attributes: AppointmentCancelledAttributes;
    eventId?: string;
    occurredOn?: Date;
  }): AppointmentCancelled {
    const { aggregateId, attributes, occurredOn, eventId } = data;
    return new AppointmentCancelled(attributes, aggregateId, eventId, occurredOn);
  }

  public toPrimitive(): AppointmentCancelledAttributes {
    return this.attributes;
  }
}
