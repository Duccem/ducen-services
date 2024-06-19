import { Mother } from '@ducen/shared';

export class UserNameMother {
  static firstName(): string {
    return Mother.random().person.firstName();
  }

  static lastName(): string {
    return Mother.random().person.lastName();
  }
}
