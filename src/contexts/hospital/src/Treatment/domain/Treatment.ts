import { Aggregate, DateValueObject, Uuid } from '@ducen-services/shared';

export class Treatment extends Aggregate {
  constructor(id: Uuid, createdAt: DateValueObject, updatedAt: DateValueObject) {
    super(id, createdAt, updatedAt);
  }
  public toPrimitives() {
    throw new Error('Method not implemented.');
  }
}
