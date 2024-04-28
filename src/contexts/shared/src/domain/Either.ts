type Left<L> = { kind: 'Left'; value: L };
type Right<R> = { kind: 'Right'; value: R };
type EitherValue<L, R> = Left<L> | Right<R>;

export class Either<L, R> {
  private constructor(private readonly value: EitherValue<L, R>) {}

  /**
   * @returns false if Right or returns the result of the given predicate to the Left value.
   */
  isLeft(): boolean {
    return this.value.kind === 'Left';
  }

  /**
   * @returns false if Left or returns the result of the given predicate to the Right value.
   */
  isRight(): boolean {
    return this.value.kind === 'Right';
  }
  /**
   * Transform an Either into a value of C. Alternative to using when to fold an Either into a value C.
   * @param leftFn - A function that takes the left value of this Either and returns a value of type C.
   * @param rightFn - A function that takes the right value of this Either and returns a value of type C.
   */
  fold<T>(leftFn: (value: L) => T, rightFn: (value: R) => T): T {
    switch (this.value.kind) {
      case 'Left':
        return leftFn(this.value.value);
      case 'Right':
        return rightFn(this.value.value);
    }
  }

  /**
   * Map, or transform, the right value B of this Either to a new value C.
   * @param fn - A function that takes the right value of this Either and returns a new value of type C.
   */
  map<T>(fn: (value: R) => T): Either<L, T> {
    return this.fold(
      (leftValue) => Either.Left(leftValue),
      (rightValue) => Either.Right(fn(rightValue)),
    );
  }

  /**
   * Map, or transform, the right value B of this Either into a new Either with a right value of type C. Returns a new Either with either the original left value of type A or the newly transformed right value of type C.
   * @param fn - A function that takes the right value of this Either and returns a new Either with a right value of type C.
   * @returns
   */
  mapFlat<T>(fn: (value: R) => Either<L, T>): Either<L, T> {
    return this.fold(
      (leftValue) => Either.Left(leftValue),
      (rightValue) => fn(rightValue),
    );
  }

  /**
   * Map, or transform, the left value A of this Either to a new value B.
   * @param fn - A function that takes the left value of this Either and returns a new value of type B.
   */
  mapLeft<T>(fn: (value: L) => T): Either<T, R> {
    return this.fold(
      (leftValue) => Either.Left(fn(leftValue)),
      (rightValue) => Either.Right(rightValue),
    );
  }

  /**
   * Map, or transform, the left value A of this Either into a new Either with a left value of type B. Returns a new Either with either the original right value of type A or the newly transformed left value of type B.
   * @param fn - A function that takes the left value of this Either and returns a new Either with a left value of type B.
   * @returns
   */
  mapLeftFlat<T>(fn: (value: L) => Either<T, R>): Either<T, R> {
    return this.fold(
      (leftValue) => fn(leftValue),
      (rightValue) => Either.Right(rightValue),
    );
  }

  /**
   * @returns the right value of this Either if it exists, otherwise returns null.
   */
  getOrNull(): R {
    return this.fold(
      () => null,
      (rightValue) => rightValue,
    );
  }

  /**
   * @returns the right value of this Either if it exists, otherwise throws an error.
   */
  getOrThrow(error?: L): R {
    return this.fold(
      (leftValue) => {
        if (error) throw error;
        throw leftValue;
      },
      (rightValue) => rightValue,
    );
  }

  /**
   * @returns the right value of this Either if it exists, otherwise returns the default value.
   */
  getOrElse(defaultValue: R): R {
    return this.fold(
      () => defaultValue,
      (someValue) => someValue,
    );
  }

  /**
   * @returns the left value of this Either if it exists, otherwise returns null.
   */
  getLeftOrNull(): L {
    return this.fold(
      (leftValue) => leftValue,
      () => null,
    );
  }

  /**
   * Performs the given action on the right value of this Either if it exists.
   */
  onRight(fn: (value: R) => void): Either<L, R> {
    if (this.isRight()) {
      fn(this.getOrNull());
    }
    return this;
  }

  /**
   * Performs the given action on the left value of this Either if it exists.
   */
  onLeft(fn: (value: L) => void): Either<L, R> {
    if (this.isLeft()) {
      fn(this.getLeftOrNull());
    }
    return this;
  }

  /**
   * Swaps the left and right values of this Either.
   */
  swap(): Either<R, L> {
    return this.fold(
      (leftValue) => Either.Right(leftValue),
      (rightValue) => Either.Left(rightValue),
    );
  }

  static async asyncTryCatch<L, R>(fn: Promise<R>, error?: L): Promise<Either<L, R>> {
    try {
      return Either.Right(await fn);
    } catch (_) {
      return Either.Left(error || _);
    }
  }

  static tryCatch<L, R>(fn: () => R, error?: L): Either<L, R> {
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
