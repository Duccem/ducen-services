import { FormatError } from '../../Errors/FormatError';
import { Enum } from '../../ValueObjects/generics/Enum';

export enum Relationships {
  ONE_TO_MANY = 'ONE_TO_MANY',
  MANY_TO_ONE = 'MANY_TO_ONE',
}

export class Relationship extends Enum<Relationships> {
  constructor(value: Relationships) {
    super(value, Object.values(Relationships));
  }

  static fromValue(value: string): Relationship {
    switch (value) {
      case Relationships.ONE_TO_MANY:
        return new Relationship(Relationships.ONE_TO_MANY);
      case Relationships.MANY_TO_ONE:
        return new Relationship(Relationships.MANY_TO_ONE);
      default:
        throw new FormatError(`The relationship ${value} is invalid`);
    }
  }

  public isOneToMany(): boolean {
    return this.value === Relationships.ONE_TO_MANY;
  }

  public isManyToOne(): boolean {
    return this.value === Relationships.MANY_TO_ONE;
  }

  public toString(): string {
    return this.value;
  }
}
