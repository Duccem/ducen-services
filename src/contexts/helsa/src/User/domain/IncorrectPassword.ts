import { AuthorizationError } from '@ducen/core';

export class IncorrectPassword extends AuthorizationError {
  constructor() {
    super('Incorrect password');
  }
}
