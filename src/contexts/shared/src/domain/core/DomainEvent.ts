/**
 * @name DomainEvent
 * @description DomainEvent is an abstract class that represents a domain event. this DTO is used to represent an event that has happened in the domain.
 * @param {string} eventName - The name of the event.
 * @param {string} aggregateId - The id of the aggregate that the event belongs to.
 * @param {string} eventId - The id of the event.
 * @param {Date} occurredOn - The date when the event occurred.
 */
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

/**
 * @name DomainEventClass
 * @description DomainEventClass is an interface that represents a domain event class. this interface is used to represent a domain event class.
 */
export type DomainEventClass = { EVENT_NAME: string; fromPrimitives(params: any): DomainEvent };

/**
 * @name EventBus
 * @description EventBus is an interface that represents an event bus. Used to publish domain events.
 */
export interface EventBus {
  publish(events: Array<DomainEvent>): Promise<void>;
}

/**
 * @name DomainEventSubscriber
 * @description DomainEventSubscriber is an interface that represents a domain event subscriber. Used to subscribe to domain events.
 */
export interface DomainEventSubscriber {
  /**
   * @name subscribedTo
   * @description Returns an array of domain events that the subscriber is subscribed to.
   */
  subscribedTo(): Array<DomainEventClass>;

  /**
   * @name on
   * @description Handles the domain event.
   * @param {DomainEvent} domainEvent - The domain event to handle.
   */
  on(domainEvent: DomainEvent): Promise<void>;

  /**
   * @name name
   * @description Returns the name of the subscriber. to build the queue name.
   */
  name(): string;
}
