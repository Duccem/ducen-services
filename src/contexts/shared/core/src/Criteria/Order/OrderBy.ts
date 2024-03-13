import { StringValueObject } from '../../ValueObjects/primitives/StringValueObject';

export class OrderBy extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
