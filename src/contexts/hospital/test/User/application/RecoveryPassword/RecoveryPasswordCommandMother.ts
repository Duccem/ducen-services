import { EmailMother } from '@ducen-services/shared';
import { RecoveryPasswordCommand } from '../../../../src/User/application/RecoveryPassword/RecoveryPasswordCommand';

export class RecoveryPasswordCommandMother {
  static create(): RecoveryPasswordCommand {
    return new RecoveryPasswordCommand(new EmailMother().generate());
  }
}
