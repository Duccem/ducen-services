import { Mother } from '@ducen/shared';

export class UserDataMother {
  static password(): string {
    return Mother.random().helpers.fromRegExp(/[A-Z][a-z][0-9][#?!@$%^&*-]{8}/);
  }

  static biography(): string {
    return Mother.random().person.bio();
  }

  static nickname(): string {
    return Mother.random().internet.userName();
  }

  static phoneNumber(): string {
    return Mother.random().helpers.fromRegExp(/^04[0,1,2,4,6]{2}[-]{0,1}[0-9]{7}$/);
  }
}
