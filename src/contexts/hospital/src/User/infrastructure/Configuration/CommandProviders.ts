import { CommandBus, EventBus } from '@ducen-services/shared';
import { Provider } from '@nestjs/common';
import { UserRegisterHandler } from '../../application/RegisterUser/UserRegisterHandler';
import { UserRepository } from '../../domain/UserRepository';

export const commandHandlers: Provider[] = [
  {
    provide: UserRegisterHandler,
    inject: ['USER_REPOSITORY', 'EVENT_BUS', 'COMMAND_BUS'],
    useFactory: (repository: UserRepository, eventBus: EventBus, commandBus: CommandBus) =>
      commandBus.addHandler(new UserRegisterHandler(repository, eventBus)),
  },
  // {
  //   provide: RecoveryPasswordHandler,
  //   inject: ['USER_REPOSITORY', 'COMMAND_BUS'],
  //   useFactory: (repository: UserRepository, commandBus: CommandBus) =>
  //     commandBus.addHandler(new RecoveryPasswordHandler(repository)),
  // },
  // {
  //   provide: ChangePasswordHandler,
  //   inject: ['USER_REPOSITORY', 'COMMAND_BUS'],
  //   useFactory: (repository: UserRepository, commandBus: CommandBus) =>
  //     commandBus.addHandler(new ChangePasswordHandler(repository)),
  // },
];
