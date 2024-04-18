import { StringValueObject } from '../../ValueObjects/primitives/StringValueObject';

export class FilterField extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
