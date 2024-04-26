import { LoginHandler } from '@ducen-services/hospital';
import { Provider } from '@nestjs/common';

export const queryHandlers: Provider[] = [
  {
    provide: LoginHandler,
    inject: ['USER_REPOSITORY', 'AUTH_SERVICE'],
    useFactory: (repository: any, authService: any) => new LoginHandler(repository, authService),
  },
];

export const userQueryHandlers = [LoginHandler];
