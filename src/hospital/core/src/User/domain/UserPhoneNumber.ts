import { StringValueObject } from '@ducen/shared';

export class UserPhoneNumber extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
  public validation(value: string): void {
    super.validation(value);
    // if (!/^04[0,1,2,4,6]{2}[-]{0,1}[0-9]{7}$/g.test(value)) {
    //   throw new FormatError('Phone number must be in the format 04xx-xxxxxx');
    // }
  }
}
