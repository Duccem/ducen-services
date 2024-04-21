import { CreateFlagHandler } from '@helsa/modules';
import { Provider } from '@nestjs/common';

export const commandHandlers: Provider[] = [
  {
    provide: CreateFlagHandler,
    inject: ['FLAG_REPOSITORY'],
    useFactory: (repository: any) => new CreateFlagHandler(repository),
  },
];

export const flagCommandHandlers = [CreateFlagHandler];
