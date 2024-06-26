import { Uuid } from '../implementations/value-objects/Uuid';
import { DomainEvent } from './DomainEvent';
import { Entity } from './Entity';
import { DateValueObject } from './ValueObject';

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
