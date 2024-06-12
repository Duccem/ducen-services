import { Nullable } from '../types/Nullable';
import { DomainError } from './DomainError';

type None = { kind: 'None' };
type Some<Value> = { kind: 'Some'; value: Value };
type MaybeValue<Value> = None | Some<Value>;

export class Maybe<Value> {
  private constructor(private readonly value: MaybeValue<Value>) {}

  isDefined(): boolean {
    return this.value.kind === 'Some';
  }

  isNone(): boolean {
    return this.value.kind === 'None';
  }

  fold<R>(noneFn: () => R, someFn: (value: Value) => R): R {
    switch (this.value.kind) {
      case 'None':
        return noneFn();
      case 'Some':
        return someFn(this.value.value);
    }
  }

  get(): Value {
    return this.getOrThrow(new Error('Value is None'));
  }

  getOrElse(defaultValue: Value): Value {
    return this.fold(
      () => defaultValue,
      (value) => value,
    );
  }

  getOrThrow<L>(error: L): Value {
    return this.fold(
      () => {
        throw error;
      },
      (value) => value,
    );
  }

  map<T>(fn: (value: Value) => T): Maybe<T> {
    return this.fold(
      () => Maybe.None(),
      (value) => Maybe.Some(fn(value)),
    );
  }

  flatMap<T>(fn: (value: Value) => Maybe<T>): Maybe<T> {
    return this.fold(
      () => Maybe.None(),
      (value) => fn(value),
    );
  }

  static Some<T>(value: Nullable<T>): Maybe<T> {
    if (value === null || value === undefined) {
      throw new DomainError('Value cannot be null or undefined');
    }
    return new Maybe({ kind: 'Some', value });
  }

  static None<T>(): Maybe<T> {
    return new Maybe({ kind: 'None' });
  }

  static fromValue<T>(value: Nullable<T>): Maybe<T> {
    return value ? Maybe.Some(value) : Maybe.None();
  }
}
