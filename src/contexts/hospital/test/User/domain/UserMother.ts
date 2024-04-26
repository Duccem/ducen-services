import { DateValueObject, EmailMother, Primitives, UuidMother, WordMother } from '@ducen-services/shared';
import { User } from '../../../src/User/domain/User';
import { UserGender } from '../../../src/User/domain/UserGender';
import { UserRole } from '../../../src/User/domain/UserRole';
import { UserAddressMother } from './UserAddressMother';
import { UserDataMother } from './UserDataMother';
import { UserNameMother } from './UserNameMother';

export class UserMother {
  static create(data?: Partial<Primitives<User>>): User {
    return User.fromPrimitives({
      id: UuidMother.random(),
      name: {
        firstName: UserNameMother.firstName(),
        lastName: UserNameMother.lastName(),
      },
      email: EmailMother.random({}),
      password: UserDataMother.password(),
      birthDate: DateValueObject.today().value,
      gender: UserGender.male().value,
      photo: WordMother.image(),
      createdAt: DateValueObject.today().value,
      updatedAt: DateValueObject.today().value,
      role: UserRole.doctor().value,
      phoneNumber: UserDataMother.phoneNumber(),
      isActive: false,
      configuration: {
        lang: WordMother.random({ maxLength: 2 }),
        timezone: WordMother.timezone(),
        theme: WordMother.random({ maxLength: 10 }),
      },
      address: UserAddressMother.random(),
      ...data,
    });
  }
}
