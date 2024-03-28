import { EmailMother } from '@shared/core';
import { RecoveryPasswordCommand } from '../../../../src/User/application/RecoveryPassword/RecoveryPasswordCommand';

export class RecoveryPasswordCommandMother {
  static create(): RecoveryPasswordCommand {
    return new RecoveryPasswordCommand(EmailMother.random({}));
  }
}
