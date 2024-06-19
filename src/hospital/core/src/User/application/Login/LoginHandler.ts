import { Query, QueryHandler } from '@ducen/shared';
import { AuthConfig } from '../../domain/AuthConfig';
import { UserRepository } from '../../domain/UserRepository';
import { Login } from './Login';
import { LoginQuery } from './LoginQuery';

export class LoginHandler implements QueryHandler<LoginQuery> {
  private login: Login;
  constructor(userRepository: UserRepository, authConfig: AuthConfig) {
    this.login = new Login(userRepository, authConfig);
  }
  subscribedTo(): Query {
    return LoginQuery;
  }

  async handle(query: LoginQuery): Promise<any> {
    return await this.login.run(query.identifier, query.password);
  }
}
