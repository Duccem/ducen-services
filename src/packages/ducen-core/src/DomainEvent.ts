export abstract class DomainEvent {
  static EVENT_NAME: string;
  static fromPrimitives: (params: any) => DomainEvent;
  readonly aggregateId: string;
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly eventName: string;

  constructor(eventName: string, aggregateId: string, eventId?: string, occurredOn?: Date) {
    this.aggregateId = aggregateId;
    this.eventId = eventId;
    this.occurredOn = occurredOn || new Date();
    this.eventName = eventName;
  }

  public abstract toPrimitive(): any;
}

export type DomainEventClass = { EVENT_NAME: string; fromPrimitives(params: any): DomainEvent };
