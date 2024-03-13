import { FormatError } from '../../Errors/FormatError';
import { ValueObject } from '../../ValueObject';

export class StringValueObject extends ValueObject<string> {
  protected validation(value: string): void {
    if (value === null || value === undefined) {
      throw new FormatError('Value string must be defined');
    }
  }

  public toString(): string {
    return this.value;
  }

  public static Empty(): StringValueObject {
    return new StringValueObject('');
  }
}
