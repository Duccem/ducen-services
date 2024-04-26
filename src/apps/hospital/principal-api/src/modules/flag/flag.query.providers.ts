import { GetFlagQueryHandler } from '@ducen-services/hospital';
import { Provider } from '@nestjs/common';

export const queryHandlers: Provider[] = [
  {
    provide: GetFlagQueryHandler,
    inject: ['FLAG_REPOSITORY', 'USER_REPOSITORY'],
    useFactory: (repository: any, userRepository: any) => new GetFlagQueryHandler(repository, userRepository),
  },
];

export const flagQueryHandlers = [GetFlagQueryHandler];
