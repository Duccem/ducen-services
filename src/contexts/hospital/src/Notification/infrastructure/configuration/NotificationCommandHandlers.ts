import { CommandBus } from '@ducen-services/shared';
import { Provider } from '@nestjs/common';
import { UserRepository } from '../../../User/domain/UserRepository';
import { SendEmailRecoveryCodeCommandHandler } from '../../application/SendEmailRecoveryCode/SendEmailRecoveryCodeCommandHandler';
import { NotificationRepository } from '../../domain/NotificationRepository';
import { EmailNotifier } from '../../domain/Notifier';

export const notificationCommandHandlers: Provider[] = [
  {
    provide: SendEmailRecoveryCodeCommandHandler,
    inject: ['NOTIFICATION_REPOSITORY', 'NOTIFICATION_USER_REPOSITORY', 'EMAIL_NOTIFIER', 'COMMAND_BUS'],
    useFactory: (
      repository: NotificationRepository,
      userRepository: UserRepository,
      notifier: EmailNotifier,
      commandBus: CommandBus,
    ) => commandBus.addHandler(new SendEmailRecoveryCodeCommandHandler(repository, userRepository, notifier)),
  },
];
