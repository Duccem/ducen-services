import { Nullable } from './Types/Nullable';

type Left<L> = { kind: 'Left'; value: L };
type Right<R> = { kind: 'Right'; value: R };
type EitherValue<L, R> = Left<L> | Right<R>;

export class Either<L, R> {
  private constructor(private readonly value: EitherValue<L, R>) {}

  isLeft(): boolean {
    return this.value.kind === 'Left';
  }

  isRight(): boolean {
    return this.value.kind === 'Right';
  }

  map<T>(leftFn: (value: L) => T, rightFn: (value: R) => T): T {
    switch (this.value.kind) {
      case 'Left':
        return leftFn(this.value.value);
      case 'Right':
        return rightFn(this.value.value);
    }
  }

  mapValue<T>(fn: (value?: R) => T): Nullable<T> {
    return this.map(
      () => null,
      (rightValue) => fn(rightValue),
    );
  }

  mapError<T>(fn: (value: L) => T): Nullable<T> {
    return this.map(
      (leftValue) => fn(leftValue),
      () => null,
    );
  }

  getOrThrow(error?: L): R {
    return this.map(
      (leftValue) => {
        if (error) throw error;
        throw leftValue;
      },
      (rightValue) => rightValue,
    );
  }

  getOrElse(defaultValue: R): R {
    return this.map(
      () => defaultValue,
      (someValue) => someValue,
    );
  }

  static async asyncTryCatch<L, T>(fn: Promise<T>, error?: L): Promise<Either<L, T>> {
    try {
      return Either.Right(await fn);
    } catch (_) {
      return Either.Left(error || _);
    }
  }

  static tryCatch<L, T>(fn: () => T, error?: L): Either<L, T> {
    try {
      return Either.Right(fn());
    } catch (_) {
      return Either.Left(error || _);
    }
  }

  static Left<L, R>(value: L): Either<L, R> {
    return new Either<L, R>({ kind: 'Left', value });
  }

  static Right<L, R>(value: R): Either<L, R> {
    return new Either<L, R>({ kind: 'Right', value });
  }
}
