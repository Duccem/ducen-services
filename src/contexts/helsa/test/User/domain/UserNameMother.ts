import { MotherCreator } from '@shared/core';

export class UserNameMother {
  static firstName(): string {
    return MotherCreator.random().person.firstName();
  }

  static lastName(): string {
    return MotherCreator.random().person.lastName();
  }
}
