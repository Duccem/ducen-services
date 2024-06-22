import { DomainEvent, Primitives } from '@ducen/shared';
import { User } from '../User';

export class UserCreated extends DomainEvent {
  static readonly EVENT_NAME: string = 'user.created';

  constructor({
    eventId,
    ocurredOn,
    aggregate,
    extraData,
  }: {
    aggregate: Primitives<User>;
    extraData?: Record<string, unknown>;
    eventId?: string;
    ocurredOn?: Date;
  }) {
    super(UserCreated.EVENT_NAME, aggregate, eventId, ocurredOn, extraData);
  }

  public toPrimitive() {
    return {
      aggregate: this.aggregate,
      id: this.eventId,
      occurred_on: this.occurredOn.toISOString(),
      type: this.eventName,
      extra_data: this.extraData,
    };
  }

  public static fromPrimitives(params: {
    aggregate?: Primitives<User>;
    extraData?: Record<string, unknown>;
    eventId?: string;
    ocurredOn?: Date;
  }): UserCreated {
    const { aggregate, extraData, ocurredOn, eventId } = params;
    return new UserCreated({
      aggregate,
      ocurredOn,
      eventId,
      extraData,
    });
  }
}
