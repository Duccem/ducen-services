import { Query, QueryHandler } from '@ducen-services/shared';
import { UserRepository } from '../../domain/UserRepository';
import { Login } from './Login';
import { LoginQuery } from './LoginQuery';

export class LoginHandler implements QueryHandler<LoginQuery> {
  private login: Login;
  constructor(userRepository: UserRepository) {
    this.login = new Login(userRepository);
  }
  subscribedTo(): Query {
    return LoginQuery;
  }

  async handle(query: LoginQuery): Promise<any> {
    return await this.login.run(query.identifier, query.password);
  }
}
