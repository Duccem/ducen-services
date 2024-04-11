import { FormatError } from '@ducen/core';

export class UserAlreadyExistError extends FormatError {
  constructor(name: string) {
    super(`User ${name} already exists`);
  }
}
