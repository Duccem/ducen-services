import { Primitives } from '@ducen/core';
import { UserRegisterCommand } from '../../../src/User/application/RegisterUser/UserRegisterCommand';
import { User } from '../../../src/User/domain/User';
import { UserMother } from './UserMother';

export class UserRegisterCommandMother {
  static fromPrimitives(data?: Primitives<User>) {
    const newUser = data ? data : UserMother.create().toPrimitives();
    return new UserRegisterCommand(newUser);
  }
}
