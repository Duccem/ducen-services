import { User, UserGender, UserRole } from '@helsa/modules';
import { DateValueObject, EmailMother, MotherCreator, Primitives, UuidMother, WordMother } from '@shared/core';

export class UserMother {
  static create(data?: Partial<Primitives<User>>): User {
    return User.fromPrimitives({
      id: UuidMother.random(),
      name: {
        firstName: MotherCreator.random().person.firstName(),
        lastName: MotherCreator.random().person.lastName(),
      },
      email: EmailMother.random({}),
      password: MotherCreator.random().helpers.fromRegExp(/[A-Z][a-z][0-9][#?!@$%^&*-]{8}/),
      birthDate: DateValueObject.today().value,
      gender: UserGender.male().value,
      photo: WordMother.image(),
      createdAt: DateValueObject.today().value,
      updatedAt: DateValueObject.today().value,
      role: UserRole.doctor().value,
      phoneNumber: MotherCreator.random().helpers.fromRegExp(/^04[0,1,2,4,6]{2}[-]{0,1}[0-9]{7}$/),
      isActive: false,
      configuration: {
        lang: WordMother.random({ maxLength: 2 }),
        timezone: WordMother.timezone(),
        theme: WordMother.random({ maxLength: 10 }),
      },
      address: {
        city: MotherCreator.random().location.city(),
        country: MotherCreator.random().location.country(),
        zipCode: MotherCreator.random().location.zipCode(),
        street: MotherCreator.random().location.streetAddress(),
        coordinates: {
          latitude: MotherCreator.random().location.latitude(),
          longitude: MotherCreator.random().location.longitude(),
        },
      },
      ...data,
    });
  }
}
