import { Primitives } from '@ducen/shared';
import { UserRegisterCommand } from '../../../src/User/application/RegisterUser/UserRegisterCommand';
import { User } from '../../../src/User/domain/User';

export class UserRegisterCommandMother {
  static fromPrimitives(data: Primitives<User>) {
    return new UserRegisterCommand(data);
  }
}
