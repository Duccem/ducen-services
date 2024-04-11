import { FormatError } from '@ducen/core';

export class PasswordFormatError extends FormatError {
  constructor(error: string) {
    super(error);
  }
}
