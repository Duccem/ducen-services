import { DomainEvent, Primitives } from '@ducen-services/shared';
import { Doctor } from './Doctor';

export class DoctorCreated extends DomainEvent {
  static readonly EVENT_NAME: string = 'doctor.created';
  readonly doctor: Primitives<Doctor>;
  constructor({
    params,
    eventId,
    ocurredOn,
    aggregateId,
  }: {
    params: Primitives<Doctor>;
    aggregateId: string;
    eventId?: string;
    ocurredOn?: Date;
  }) {
    super(DoctorCreated.EVENT_NAME, aggregateId, eventId, ocurredOn);
  }

  toPrimitive(): Primitives<Doctor> {
    return this.doctor;
  }

  static fromPrimitives(params: {
    aggregateId?: string;
    attributes: Primitives<Doctor>;
    eventId?: string;
    occurredOn?: Date;
  }): DoctorCreated {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new DoctorCreated({
      aggregateId,
      ocurredOn: occurredOn,
      eventId,
      params: attributes,
    });
  }
}
