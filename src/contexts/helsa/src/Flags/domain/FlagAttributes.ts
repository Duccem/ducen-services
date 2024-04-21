import { ValueObject } from '@ducen/core';

export class FlagAttributes extends ValueObject<{ [key: string]: any }> {
  protected validation(value: { [key: string]: any }): void {
    if (!value) {
      throw new Error('FlagAttributes must have a value');
    }
  }
  public toString(): string {
    return JSON.stringify(this.value);
  }
}
