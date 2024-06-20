import { FormatError } from '@ducen/shared';

export class PasswordFormatError extends FormatError {
  constructor(error: string) {
    super(error);
  }
}
