import { BaseObject, Primitives, StringValueObject } from '@ducen/core';
import { UserCoordinates } from './UserCoordinates';

export class UserAddress extends BaseObject {
  constructor(
    public country: StringValueObject,
    public city: StringValueObject,
    public street: StringValueObject,
    public zipCode: StringValueObject,
    public coordinates: UserCoordinates
  ) {
    super();
  }
  public static fromPrimitives(data: Primitives<UserAddress>): UserAddress {
    return new UserAddress(
      new StringValueObject(data.country),
      new StringValueObject(data.city),
      new StringValueObject(data.street),
      new StringValueObject(data.zipCode),
      UserCoordinates.fromPrimitives(data.coordinates)
    );
  }
  public toPrimitives(): Primitives<UserAddress> {
    return {
      city: this.city.value,
      country: this.country.value,
      zipCode: this.zipCode.value,
      street: this.street.value,
      coordinates: this.coordinates.toPrimitives(),
    };
  }
}
