import { NumberValueObject } from '../../ValueObjects/primitives/NumberValueObject';

export class Limit extends NumberValueObject {
  constructor(value: number) {
    super(value);
  }
}
