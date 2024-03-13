import { Enum } from '@shared/core';

export enum UserRoles {
  DOCTOR = 'DOCTOR',
  PATIENT = 'PATIENT',
}

export class UserRole extends Enum<UserRoles> {
  constructor(value: UserRoles) {
    super(value, Object.values(UserRoles));
  }
  static doctor(): UserRole {
    return new UserRole(UserRoles.DOCTOR);
  }
  static patient(): UserRole {
    return new UserRole(UserRoles.PATIENT);
  }
  public toString(): string {
    return this.value;
  }
}
