import { QueryBus } from '@ducen-services/shared';
import { Provider } from '@nestjs/common';
import { GenerateUserHabitsQueryHandler } from '../../application/GenerateUserHabits/GenerateUserHabitsQueryHandler';
import { LoginHandler } from '../../application/Login/LoginHandler';
import { HabitsGenerator } from '../../domain/HabitsGenerator';
import { UserRepository } from '../../domain/UserRepository';

export const queryHandlers: Provider[] = [
  {
    provide: LoginHandler,
    inject: ['USER_REPOSITORY', 'QUERY_BUS', 'SERVER_CONFIGURATION'],
    useFactory: (repository: UserRepository, queryBus: QueryBus, serverConf: any) =>
      queryBus.addHandler(new LoginHandler(repository, { authKey: serverConf.authKey })),
  },
  {
    provide: GenerateUserHabitsQueryHandler,
    inject: ['HABITS_GENERATOR', 'USER_REPOSITORY', 'QUERY_BUS'],
    useFactory: (habitsGenerator: HabitsGenerator, userRepository: UserRepository, queryBus: QueryBus) =>
      queryBus.addHandler(new GenerateUserHabitsQueryHandler(habitsGenerator, userRepository)),
  },
];
