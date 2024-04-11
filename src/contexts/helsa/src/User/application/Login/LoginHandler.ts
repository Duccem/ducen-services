import { Query, QueryHandler } from '@ducen/core';
import { AuthService } from '../../domain/AuthService';
import { UserRepository } from '../../domain/UserRepository';
import { Login } from './Login';
import { LoginQuery } from './LoginQuery';

export class LoginHandler implements QueryHandler<LoginQuery> {
  private login: Login;
  constructor(userRepository: UserRepository, authService: AuthService) {
    this.login = new Login(userRepository, authService);
  }
  subscribedTo(): Query {
    return LoginQuery;
  }

  async handle(query: LoginQuery): Promise<any> {
    return await this.login.run(query.identifier, query.password);
  }
}
