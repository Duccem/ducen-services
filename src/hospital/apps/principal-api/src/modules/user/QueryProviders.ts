import {
  LoginHandler,
  UserRepository,
  GenerateUserHabitsQueryHandler,
  HabitsGenerator,
} from '@ducen/hospital';
import { QueryBus } from '@ducen/shared';
import { Provider } from '@nestjs/common';

export const queryHandlers: Provider[] = [
  {
    provide: LoginHandler,
    inject: ['USER_REPOSITORY', 'QUERY_BUS', 'SERVER_CONFIGURATION'],
    useFactory: (repository: UserRepository, queryBus: QueryBus, serverConf: any) =>
      queryBus.addHandler(new LoginHandler(repository, { authKey: serverConf.authKey })),
  },
  {
    provide: GenerateUserHabitsQueryHandler,
    inject: ['HABITS_GENERATOR', 'QUERY_BUS'],
    useFactory: (habitsGenerator: HabitsGenerator, queryBus: QueryBus) =>
      queryBus.addHandler(new GenerateUserHabitsQueryHandler(habitsGenerator)),
  },
];
