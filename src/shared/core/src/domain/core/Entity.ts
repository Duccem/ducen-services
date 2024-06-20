import { Uuid } from '../implementations/value-objects/Uuid';
import { BaseObject } from './BaseObject';
import { DateValueObject } from './ValueObject';

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
