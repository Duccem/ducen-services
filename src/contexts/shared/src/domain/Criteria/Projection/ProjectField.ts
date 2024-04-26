import { StringValueObject } from '../../ValueObjects/primitives/StringValueObject';

export class ProjectField extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
