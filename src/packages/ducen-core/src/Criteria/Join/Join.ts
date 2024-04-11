import { JoinEntity } from './JoinEntity';
import { Relationship } from './Relationship';

export class Join {
  readonly left: JoinEntity;
  readonly relationship: Relationship;
  readonly right: JoinEntity;
  readonly fields: string[];
  constructor(foreignEntity: JoinEntity, relationship: Relationship, localEntity: JoinEntity) {
    this.left = foreignEntity;
    this.relationship = relationship;
    this.right = localEntity;
  }

  static fromValues(values: Map<string, string>): Join {
    const foreign = values.get('foreign');
    const relationship = values.get('relationship');
    const local = values.get('local');
    if (!foreign || !relationship || !local) {
      throw new Error(`The join is invalid`);
    }

    return new Join(
      new JoinEntity(foreign),
      Relationship.fromValue(relationship),
      new JoinEntity(local)
    );
  }
}
