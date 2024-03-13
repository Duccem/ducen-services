import { FormatError } from '../../Errors/FormatError';
import { ValueObject } from '../../ValueObject';

export class NumberValueObject extends ValueObject<number> {
  public validation(value: number): void {
    if (value === null || value === undefined) {
      throw new FormatError('Value number must be defined');
    }
  }

  public getValue(): number {
    return this.value;
  }

  public toString(): string {
    return this.value.toString();
  }

  public static zero(): NumberValueObject {
    return new NumberValueObject(0);
  }
}
