import { Entity, Uuid } from '@ducen-services/shared';

export class LabResult extends Entity {
  constructor(id: Uuid) {}
  public toPrimitives() {
    return {
      id: this.id.toString(),
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }
}
