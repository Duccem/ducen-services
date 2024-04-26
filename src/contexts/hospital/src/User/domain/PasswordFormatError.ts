import { FormatError } from '@ducen-services/shared';

export class PasswordFormatError extends FormatError {
  constructor(error: string) {
    super(error);
  }
}
