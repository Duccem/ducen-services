import {
  UserRegisterHandler,
  UserRepository,
  UploadProfileImageCommandHandler,
  StoreService,
  IngestKnowledgeBaseCommandHandler,
  HabitsGenerator,
  RecoveryPasswordHandler,
  ChangePasswordHandler,
} from '@ducen/hospital';
import { CommandBus, EventBus } from '@ducen/shared';
import { Provider } from '@nestjs/common';

export const commandHandlers: Provider[] = [
  {
    provide: UserRegisterHandler,
    inject: ['USER_REPOSITORY', 'EVENT_BUS', 'COMMAND_BUS'],
    useFactory: (repository: UserRepository, eventBus: EventBus, commandBus: CommandBus) =>
      commandBus.addHandler(new UserRegisterHandler(repository, eventBus)),
  },
  {
    provide: UploadProfileImageCommandHandler,
    inject: ['USER_REPOSITORY', 'STORE_SERVICE', 'COMMAND_BUS'],
    useFactory: (repository: UserRepository, storeService: StoreService, commandBus: CommandBus) =>
      commandBus.addHandler(new UploadProfileImageCommandHandler(repository, storeService)),
  },
  {
    provide: IngestKnowledgeBaseCommandHandler,
    inject: ['HABITS_GENERATOR', 'COMMAND_BUS'],
    useFactory: (habitsGenerator: HabitsGenerator, commandBus: CommandBus) =>
      commandBus.addHandler(new IngestKnowledgeBaseCommandHandler(habitsGenerator)),
  },
  {
    provide: RecoveryPasswordHandler,
    inject: ['USER_REPOSITORY', 'COMMAND_BUS'],
    useFactory: (repository: UserRepository, commandBus: CommandBus) =>
      commandBus.addHandler(new RecoveryPasswordHandler(repository)),
  },
  {
    provide: ChangePasswordHandler,
    inject: ['USER_REPOSITORY', 'COMMAND_BUS'],
    useFactory: (repository: UserRepository, commandBus: CommandBus) =>
      commandBus.addHandler(new ChangePasswordHandler(repository)),
  },
];
