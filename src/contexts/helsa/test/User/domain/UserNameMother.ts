import { MotherCreator } from '@ducen/core';

export class UserNameMother {
  static firstName(): string {
    return MotherCreator.random().person.firstName();
  }

  static lastName(): string {
    return MotherCreator.random().person.lastName();
  }
}
