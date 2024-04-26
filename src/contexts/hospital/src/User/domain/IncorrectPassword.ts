import { AuthorizationError } from '@ducen-services/shared';

export class IncorrectPassword extends AuthorizationError {
  constructor() {
    super('Incorrect password');
  }
}
