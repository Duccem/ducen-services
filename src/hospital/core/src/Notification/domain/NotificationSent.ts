import { DomainEvent, DomainEventPrimitives, Primitives } from '@ducen/shared';
import { Notification } from './Notification';

export class NotificationSent extends DomainEvent {
  static readonly EVENT_NAME: string = 'notification.sent';
  constructor({
    aggregate,
    extraData,
    eventId,
    ocurredOn,
  }: {
    aggregate: Primitives<Notification>; // Change to the aggregate primitive
    extraData?: Record<string, unknown>;
    eventId?: string;
    ocurredOn?: Date;
  }) {
    super(NotificationSent.EVENT_NAME, aggregate, eventId, ocurredOn, extraData);
  }
  toPrimitive(): DomainEventPrimitives {
    throw new Error('Method not implemented.');
  }
  static fromPrimitives(data: DomainEventPrimitives): NotificationSent {
    return new NotificationSent({
      aggregate: data.aggregate as Primitives<Notification>,
      eventId: data.id,
      ocurredOn: new Date(data.occurred_on),
      extraData: data.extra_data,
    });
  }

  static Email(userId: string, title: string, body: string, data: Record<string, unknown>): NotificationSent {
    const event = {
      title,
      body,
      data,
      types: ['email'],
      userId,
    } as Primitives<Notification>;
    return new NotificationSent({
      aggregate: event,
    });
  }
  isPublic(): boolean {
    return false;
  }
}
