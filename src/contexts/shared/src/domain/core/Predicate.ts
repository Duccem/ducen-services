export abstract class Predicate<T> {
  abstract isSatisfiedBy(candidate: T): boolean;
  and(other: Predicate<T>): Predicate<T> {
    return new AndPredicate(this, other);
  }
  or(other: Predicate<T>): Predicate<T> {
    return new OrPredicate(this, other);
  }
  not(): Predicate<T> {
    return new NotPredicate(this);
  }
}

class AndPredicate<T> extends Predicate<T> {
  constructor(
    private readonly first: Predicate<T>,
    private readonly second: Predicate<T>,
  ) {
    super();
  }
  isSatisfiedBy(candidate: T): boolean {
    return this.first.isSatisfiedBy(candidate) && this.second.isSatisfiedBy(candidate);
  }
}

class OrPredicate<T> extends Predicate<T> {
  constructor(
    private readonly first: Predicate<T>,
    private readonly second: Predicate<T>,
  ) {
    super();
  }
  isSatisfiedBy(candidate: T): boolean {
    return this.first.isSatisfiedBy(candidate) || this.second.isSatisfiedBy(candidate);
  }
}

class NotPredicate<T> extends Predicate<T> {
  constructor(private readonly predicate: Predicate<T>) {
    super();
  }
  isSatisfiedBy(candidate: T): boolean {
    return !this.predicate.isSatisfiedBy(candidate);
  }
}
