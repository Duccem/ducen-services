import { BaseObject, Primitives, StringValueObject } from '@ducen/shared';

export class UserName extends BaseObject {
  constructor(public firstName: StringValueObject, public lastName: StringValueObject) {
    super();
  }
  public static fromPrimitives(data: Primitives<UserName>): UserName {
    return new UserName(new StringValueObject(data.firstName), new StringValueObject(data.lastName));
  }
  public toPrimitives(): Primitives<UserName> {
    return {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
    };
  }

  public fullName(): string {
    return `${this.firstName.value} ${this.lastName.value}`;
  }
}
