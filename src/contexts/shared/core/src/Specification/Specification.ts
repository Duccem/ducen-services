export interface Specification<T> {
  isSatisfiedBy(candidate: T): boolean;
}

export abstract class StandardSpecification<T> implements Specification<T> {
  public abstract isSatisfiedBy(candidate: T): boolean;

  public not(): Specification<T> {
    return new NotSpecification(this);
  }
}

export class AndSpecification<T> implements Specification<T> {
  constructor(private readonly specifications: Specification<T>[]) {}
  public isSatisfiedBy(candidate: T): boolean {
    return this.specifications.every((specification) => specification.isSatisfiedBy(candidate));
  }
}

export class OrSpecification<T> implements Specification<T> {
  constructor(private readonly specifications: Specification<T>[]) {}
  public isSatisfiedBy(candidate: T): boolean {
    return this.specifications.some((specification) => specification.isSatisfiedBy(candidate));
  }
}

export class NotSpecification<T> implements Specification<T> {
  constructor(private readonly specification: Specification<T>) {}
  public isSatisfiedBy(candidate: T): boolean {
    return !this.specification.isSatisfiedBy(candidate);
  }
}
