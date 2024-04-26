import { StringValueObject } from '../../ValueObjects/primitives/StringValueObject';

export class JoinEntity extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
