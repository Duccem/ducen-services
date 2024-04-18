import { NotFoundError } from '@ducen/core';

export class UserNotExist extends NotFoundError {
  constructor() {
    super(`User not exist`);
  }
}
