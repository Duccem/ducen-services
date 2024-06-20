import { NotFoundError } from '@ducen/shared';

export class UserNotExist extends NotFoundError {
  constructor() {
    super(`User not exist`);
  }
}
