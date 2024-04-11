import { MotherCreator } from '@ducen/core';
import { ChangePasswordCommand } from '../../../../src/User/application/ChangePassword/ChangePasswordCommand';

export class ChangePasswordCommandMother {
  static create(userId: string, oldPassword: string): ChangePasswordCommand {
    return new ChangePasswordCommand(
      userId,
      MotherCreator.random().helpers.fromRegExp(/[A-Z][a-z][0-9][#?!@$%^&*-]{8}/),
      oldPassword
    );
  }
}
