import { NotFoundError } from '@shared/core';

export class UserNotExist extends NotFoundError {
  constructor() {
    super(`User not exist`);
  }
}
