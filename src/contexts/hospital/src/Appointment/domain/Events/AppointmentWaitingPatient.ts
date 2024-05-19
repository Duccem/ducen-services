import { DomainEvent } from '@ducen-services/shared';

export type AppointmentWaitingPatientAttributes = {
  appointmentId: string;
  initDate: Date;
  link: string;
};
export class AppointmentWaitingPatient extends DomainEvent {
  static readonly EVENT_NAME: string = 'appointment.waiting_patient';
  private readonly attributes: AppointmentWaitingPatientAttributes;

  constructor(event: AppointmentWaitingPatientAttributes, aggregateId: string, eventId?: string, occurredOn?: Date) {
    super(AppointmentWaitingPatient.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.attributes = event;
  }

  static fromPrimitives(data: {
    aggregateId: string;
    attributes: AppointmentWaitingPatientAttributes;
    eventId?: string;
    occurredOn?: Date;
  }): AppointmentWaitingPatient {
    const { aggregateId, attributes, occurredOn, eventId } = data;
    return new AppointmentWaitingPatient(attributes, aggregateId, eventId, occurredOn);
  }

  public toPrimitive(): AppointmentWaitingPatientAttributes {
    return this.attributes;
  }
}
