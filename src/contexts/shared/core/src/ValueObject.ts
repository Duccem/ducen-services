export abstract class ValueObject<T> {
  public value: T;
  constructor(value: T) {
    this.validation(value);
    this.value = value;
  }
  equals(other: ValueObject<T>): boolean {
    return other.constructor.name === this.constructor.name && other.value === this.value;
  }
  protected abstract validation(value: T): void;
  public abstract toString(): string;
}
