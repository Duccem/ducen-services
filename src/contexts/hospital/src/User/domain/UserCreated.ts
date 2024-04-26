import { DomainEvent, Primitives } from '@ducen-services/shared';
import { User } from './User';

export class UserCreated extends DomainEvent {
  static readonly EVENT_NAME: string = 'user.created';
  readonly user: Primitives<User>;

  constructor({
    params,
    eventId,
    ocurredOn,
    aggregateId,
  }: {
    params: Primitives<User>;
    aggregateId: string;
    eventId?: string;
    ocurredOn?: Date;
  }) {
    super(UserCreated.EVENT_NAME, aggregateId, eventId, ocurredOn);
    this.user = params;
  }

  public toPrimitive(): Primitives<User> {
    return this.user;
  }

  public static fromPrimitives(params: {
    aggregateId?: string;
    attributes: Primitives<User>;
    eventId?: string;
    occurredOn?: Date;
  }): UserCreated {
    const { aggregateId, attributes, occurredOn, eventId } = params;
    return new UserCreated({
      aggregateId,
      ocurredOn: occurredOn,
      eventId,
      params: attributes,
    });
  }
}
