import { StringValueObject } from '../../ValueObjects/primitives/StringValueObject';

export class FilterValue extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
