import { MotherCreator } from '@ducen/core';

export class UserDataMother {
  static password(): string {
    return MotherCreator.random().helpers.fromRegExp(/[A-Z][a-z][0-9][#?!@$%^&*-]{8}/);
  }

  static biography(): string {
    return MotherCreator.random().person.bio();
  }

  static nickname(): string {
    return MotherCreator.random().internet.userName();
  }

  static phoneNumber(): string {
    return MotherCreator.random().helpers.fromRegExp(/^04[0,1,2,4,6]{2}[-]{0,1}[0-9]{7}$/);
  }
}
