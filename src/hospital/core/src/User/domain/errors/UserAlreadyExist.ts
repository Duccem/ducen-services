import { FormatError } from '@ducen/shared';

export class UserAlreadyExistError extends FormatError {
  constructor(name: string) {
    super(`User ${name} already exists`);
  }
}
