import { BaseObject } from './BaseObject';
import { DateValueObject, StringValueObject } from './ValueObject';

export abstract class Entity extends BaseObject {
  public id: StringValueObject;
  public createdAt?: DateValueObject;
  public updatedAt?: DateValueObject;

  constructor(id: StringValueObject, createdAt?: DateValueObject, updatedAt?: DateValueObject) {
    super();
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
