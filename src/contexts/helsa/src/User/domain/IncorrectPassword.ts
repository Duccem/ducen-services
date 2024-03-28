import { AuthorizationError } from '@shared/core';

export class IncorrectPassword extends AuthorizationError {
  constructor() {
    super('Incorrect password');
  }
}
