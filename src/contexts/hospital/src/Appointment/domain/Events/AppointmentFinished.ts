import { DomainEvent } from '@ducen-services/shared';

export type AppointmentFinishedAttributes = {
  appointmentId: string;
};
export class AppointmentFinished extends DomainEvent {
  static readonly EVENT_NAME: string = 'appointment.finished';
  private readonly attributes: AppointmentFinishedAttributes;

  constructor(event: AppointmentFinishedAttributes, aggregateId: string, eventId?: string, occurredOn?: Date) {
    super(AppointmentFinished.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.attributes = event;
  }

  static fromPrimitives(data: {
    aggregateId: string;
    attributes: AppointmentFinishedAttributes;
    eventId?: string;
    occurredOn?: Date;
  }): AppointmentFinished {
    const { aggregateId, attributes, occurredOn, eventId } = data;
    return new AppointmentFinished(attributes, aggregateId, eventId, occurredOn);
  }

  public toPrimitive(): AppointmentFinishedAttributes {
    return this.attributes;
  }
}
