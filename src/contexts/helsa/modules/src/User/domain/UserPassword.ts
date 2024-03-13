import { StringValueObject } from '@shared/core';
import * as bcrypt from 'bcryptjs';
import { PasswordFormatError } from './PasswordFormatError';

export class UserPassword extends StringValueObject {
  public validation(value: string): void {
    super.validation(value);
    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/gm.test(value)) {
      throw new PasswordFormatError(
        'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character',
      );
    }
  }

  public encrypt(): void {
    const salt = bcrypt.genSaltSync(10);
    this.value = bcrypt.hashSync(this.value, salt);
  }

  public compare(given_password: string): boolean {
    const valid = bcrypt.compareSync(given_password, this.value);
    return valid;
  }

  static encryptValue(value: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(value, salt);
  }
}
