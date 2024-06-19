import { DomainEvent } from '@ducen/shared';

export type AppointmentWaitingDoctorAttributes = {
  appointmentId: string;
  initDate: Date;
  link: string;
};
export class AppointmentWaitingDoctor extends DomainEvent {
  static readonly EVENT_NAME: string = 'appointment.waiting_doctor';
  private readonly attributes: AppointmentWaitingDoctorAttributes;

  constructor(
    event: AppointmentWaitingDoctorAttributes,
    aggregateId: string,
    eventId?: string,
    occurredOn?: Date
  ) {
    super(AppointmentWaitingDoctor.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.attributes = event;
  }

  static fromPrimitives(data: {
    aggregateId: string;
    attributes: AppointmentWaitingDoctorAttributes;
    eventId?: string;
    occurredOn?: Date;
  }): AppointmentWaitingDoctor {
    const { aggregateId, attributes, occurredOn, eventId } = data;
    return new AppointmentWaitingDoctor(attributes, aggregateId, eventId, occurredOn);
  }

  public toPrimitive(): AppointmentWaitingDoctorAttributes {
    return this.attributes;
  }
}
