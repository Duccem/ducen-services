interface PipeOperator {
  <A>(value: A): A;
  <A, B>(a: A, ab: (a: A) => B): B;
  <A, B, C>(a: A, ab: (a: A) => B, bc: (b: B) => C): C;
  <A, B, C, D>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D): D;
  <A, B, C, D, E>(a: A, ab: (a: A) => B, bc: (b: B) => C, cd: (c: C) => D, de: (d: D) => E): E;
  <A, B, C, D, E, F>(
    a: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D,
    de: (d: D) => E,
    ef: (e: E) => F,
  ): F;
}
interface AsyncPipeOperator {
  <A>(value: A): A | Promise<A>;
  <A, B>(a: A, ab: (a: A) => B | Promise<B>): B | Promise<B>;
  <A, B, C>(a: A, ab: (a: A) => B | Promise<B>, bc: (b: B) => C | Promise<C> | Promise<C>): C | Promise<C>;
  <A, B, C, D>(
    a: A,
    ab: (a: A) => B | Promise<B>,
    bc: (b: B) => C | Promise<C>,
    cd: (c: C) => D | Promise<D>,
  ): D | Promise<D>;
  <A, B, C, D, E>(
    a: A,
    ab: (a: A) => B | Promise<B>,
    bc: (b: B) => C | Promise<C>,
    cd: (c: C) => D | Promise<D>,
    de: (d: D) => E | Promise<E>,
  ): E | Promise<E>;
  <A, B, C, D, E, F>(
    a: A,
    ab: (a: A) => B | Promise<B>,
    bc: (b: B) => C | Promise<C>,
    cd: (c: C) => D | Promise<D>,
    de: (d: D) => E | Promise<E>,
    ef: (e: E) => F | Promise<F>,
  ): F | Promise<F>;
}

export class Pipe {
  /**
   * @description This function is a pipe operator that takes a value and a series of functions and pipes the value through the functions from left to right. The result of each function is passed as the argument to the next function. The final result is returned as the result of the pipe operation. Maximum number of functions is 5.
   * you can use this function to compose functions in a more readable way. It is similar to the pipe operator in Elixir. Also you can use more of one pipe in the same line.
   * @param value - The value to pipe through the functions.
   * @param fns - The functions to pipe the value through.
   * @returns The result of piping the value through the functions.
   * @example const value = pipe(2, (x) => x + 1, (x) => x * 2, (x) => x.toString());
   * console.log(value); // '6'
   * const value = pipe(2, (x) => x + 1, (x) => x * 2, (x) => pipe(x, (x) => x - 2 ,(x) => x.toString()));
   * console.log(value); // '4'
   */
  static pipe: PipeOperator = (value: any, ...fns: Function[]): unknown => {
    return fns.reduce((acc, fn) => fn(acc), value);
  };

  /**
   * @description This function is a pipe operator that takes a value and a series of functions or promises and pipes the value through the functions from left to right. The result of each function is passed as the argument to the next function. The final result is returned as the result of the pipe operation. Maximum number of functions is 5.
   * you can use this function to compose functions in a more readable way. It is similar to the pipe operator in Elixir. Also you can use more of one pipe in the same line.
   * @param value - The value to pipe through the functions.
   * @param fns - The functions to pipe the value through.
   * @returns The result of piping the value through the functions.
   * @example const value = pipe(2, (x) => x + 1, (x) => x * 2, (x) => x.toString());
   * console.log(value); // '6'
   * const val = await asyncPipe(2, (x) => x + 1, (x) => new Promise(function (resolve, reject) => setTimeout(() => resolve(x * 2), 30)), (x) => x.toString());
   * console.log(value); // '6'
   */
  static asyncPipe: AsyncPipeOperator = async (
    value: any,
    ...fns: ((val: any) => any)[]
  ): Promise<unknown> => {
    return fns.reduce(async (acc, fn) => {
      if (acc instanceof Promise) return fn(await acc);
      else return fn(acc);
    }, value);
  };
}
