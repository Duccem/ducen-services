import { Mother, Primitives } from '@ducen/shared';
import { UserAddress } from '../../../src/User/domain/model/UserAddress';

export class UserAddressMother {
  static random(): Primitives<UserAddress> {
    return {
      city: Mother.random().location.city(),
      country: Mother.random().location.country(),
      zipCode: Mother.random().location.zipCode(),
      street: Mother.random().location.streetAddress(),
      coordinates: {
        latitude: Mother.random().location.latitude(),
        longitude: Mother.random().location.longitude(),
      },
    };
  }
}
