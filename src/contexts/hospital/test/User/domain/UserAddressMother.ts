import { MotherCreator, Primitives } from '@ducen-services/shared';
import { UserAddress } from '../../../src/User/domain/UserAddress';

export class UserAddressMother {
  static random(): Primitives<UserAddress> {
    return {
      city: MotherCreator.random().location.city(),
      country: MotherCreator.random().location.country(),
      zipCode: MotherCreator.random().location.zipCode(),
      street: MotherCreator.random().location.streetAddress(),
      coordinates: {
        latitude: MotherCreator.random().location.latitude(),
        longitude: MotherCreator.random().location.longitude(),
      },
    };
  }
}
