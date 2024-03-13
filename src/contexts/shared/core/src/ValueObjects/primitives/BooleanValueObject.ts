import { ValueObject } from '../../ValueObject';

export class BooleanValueObject extends ValueObject<boolean> {
  constructor(value: boolean) {
    super(value);
  }
  public validation(value: boolean): void {
    if (typeof value !== 'boolean') throw new Error(`${value} is not a valid boolean`);
  }
  public getValue(): boolean {
    return this.value;
  }
  public toString(): string {
    return this.value.toString();
  }
}
