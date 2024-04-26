import { FormatError } from '@ducen-services/shared';

export class UserAlreadyExistError extends FormatError {
  constructor(name: string) {
    super(`User ${name} already exists`);
  }
}
