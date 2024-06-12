import { Uuid } from '../ValueObjects/generics/Uuid';
import { DateValueObject } from '../ValueObjects/primitives/DateValueObject';
import { BaseObject } from './BaseObject';

export abstract class Entity extends BaseObject {
  public id: Uuid;
  public createdAt?: DateValueObject;
  public updatedAt?: DateValueObject;

  constructor(id: Uuid, createdAt?: DateValueObject, updatedAt?: DateValueObject) {
    super();
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
