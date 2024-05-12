import { QueryBus } from '@ducen-services/shared';
import { Provider } from '@nestjs/common';
import { LoginHandler } from '../../application/Login/LoginHandler';
import { UserRepository } from '../../domain/UserRepository';

export const queryHandlers: Provider[] = [
  {
    provide: LoginHandler,
    inject: ['USER_REPOSITORY', 'QUERY_BUS'],
    useFactory: (repository: UserRepository, queryBus: QueryBus) => queryBus.addHandler(new LoginHandler(repository)),
  },
];
