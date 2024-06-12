import { DomainEvent } from './DomainEvent';
import { Entity } from './Entity';
import { DateValueObject, StringValueObject } from './ValueObject';

export abstract class Aggregate extends Entity {
  private domainEvents: Array<DomainEvent>;
  constructor(id: StringValueObject, createdAt?: DateValueObject, updatedAt?: DateValueObject) {
    super(id, createdAt, updatedAt);
    this.domainEvents = [];
  }

  public pullDomainEvents(): Array<DomainEvent> {
    const domainEvents = this.domainEvents.slice();
    this.domainEvents = [];
    return domainEvents;
  }

  public record(event: DomainEvent): void {
    this.domainEvents.push(event);
  }
}
