import { Either } from './Either';

export class EitherAsync<L, R> {
  private constructor(private readonly promiseValue: () => Promise<Either<L, R>>) {}

  async run(): Promise<Either<L, R>> {
    return this.promiseValue();
  }

  map<T>(fn: (value: R) => T): EitherAsync<L, T> {
    return this.flatMap(async (value) => Either.Right(fn(value)));
  }

  flatMap<T>(fn: (value: R) => Promise<Either<L, T>>): EitherAsync<L, T> {
    return new EitherAsync(async () => {
      const either = await this.promiseValue();
      return either.fold(
        async (rightValue) => Either.Left<L, T>(rightValue),
        (rightValue) => fn(rightValue),
      );
    });
  }

  error<T>(fn: (value: L) => T): EitherAsync<T, R> {
    return this.flatError(async (value) => Either.Left(fn(value)));
  }

  flatError<T>(fn: (value: L) => Promise<Either<T, R>>): EitherAsync<T, R> {
    return new EitherAsync(async () => {
      const either = await this.promiseValue();
      return either.fold(
        (leftValue) => fn(leftValue),
        async (rightValue) => Either.Right<T, R>(rightValue),
      );
    });
  }

  static fromEither<L, R>(either: Either<L, R>): EitherAsync<L, R> {
    return new EitherAsync(() => Promise.resolve(either));
  }

  static fromPromise<L, R>(value: Promise<Either<L, R>>): EitherAsync<L, R> {
    return new EitherAsync<L, R>(() => value);
  }

  static tryCatch<L, R>(fn: () => Promise<R>, errFn: (error) => Promise<L>): EitherAsync<L, R> {
    return new EitherAsync(async () => {
      try {
        const result = await fn();
        return Either.Right(result);
      } catch (error) {
        return Either.Left(await errFn(error));
      }
    });
  }
}
