import { MotherCreator } from '@ducen-services/shared';

export class UserNameMother {
  static firstName(): string {
    return MotherCreator.random().person.firstName();
  }

  static lastName(): string {
    return MotherCreator.random().person.lastName();
  }
}
