import { Query } from '@ducen-services/shared';

export class LoginQuery extends Query {
  readonly identifier: string;
  readonly password: string;
  constructor(identifier: string, password: string) {
    super();
    this.identifier = identifier;
    this.password = password;
  }
}
