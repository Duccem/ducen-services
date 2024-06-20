import { DateValueObject, EmailMother, Primitives, UuidMother, WordMother } from '@ducen/shared';
import { User } from '../../../src/User/domain/User';
import { UserGender } from '../../../src/User/domain/model/UserGender';
import { UserRole } from '../../../src/User/domain/model/UserRole';
import { UserAddressMother } from './UserAddressMother';
import { UserDataMother } from './UserDataMother';
import { UserNameMother } from './UserNameMother';

export class UserMother {
  static create(data?: Partial<Primitives<User>>): User {
    return User.fromPrimitives({
      id: new UuidMother().generate(),
      name: {
        firstName: UserNameMother.firstName(),
        lastName: UserNameMother.lastName(),
      },
      email: new EmailMother().generate(),
      password: UserDataMother.password(),
      birthDate: DateValueObject.today().value,
      gender: UserGender.male().value,
      photo: new WordMother().image(),
      createdAt: DateValueObject.today().value,
      updatedAt: DateValueObject.today().value,
      role: UserRole.doctor().value,
      phoneNumber: UserDataMother.phoneNumber(),
      isActive: false,
      configuration: {
        lang: new WordMother().generate({ maxLength: 2 }),
        timezone: new WordMother().timezone(),
        theme: new WordMother().generate({ maxLength: 10 }),
      },
      address: UserAddressMother.random(),
      devices: [],
      ...data,
    });
  }
}
