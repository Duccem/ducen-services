import { FormatError } from '@shared/core';

export class PasswordFormatError extends FormatError {
  constructor(error: string) {
    super(error);
  }
}
