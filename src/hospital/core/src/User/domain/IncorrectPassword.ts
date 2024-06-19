import { AuthorizationError } from '@ducen/shared';

export class IncorrectPassword extends AuthorizationError {
  constructor() {
    super('Incorrect password');
  }
}
