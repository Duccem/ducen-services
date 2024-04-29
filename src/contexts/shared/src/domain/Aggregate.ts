import { Entity } from './Entity';
import { DomainEvent } from './Events/DomainEvent';
import { Uuid } from './ValueObjects/generics/Uuid';
import { DateValueObject } from './ValueObjects/primitives/DateValueObject';

export abstract class Aggregate extends Entity {
  private domainEvents: Array<DomainEvent>;
  constructor(id: Uuid, createdAt?: DateValueObject, updatedAt?: DateValueObject) {
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
