import { Enum } from '@ducen/core';
export enum UserGenders {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}
export class UserGender extends Enum<UserGenders> {
  constructor(value: UserGenders) {
    super(value, Object.values(UserGenders));
  }
  static male(): UserGender {
    return new UserGender(UserGenders.MALE);
  }
  static female(): UserGender {
    return new UserGender(UserGenders.FEMALE);
  }
  static other(): UserGender {
    return new UserGender(UserGenders.OTHER);
  }
  public toString(): string {
    return this.value;
  }
}
