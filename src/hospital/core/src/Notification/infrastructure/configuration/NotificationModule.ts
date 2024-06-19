import { Module } from '@nestjs/common';
import { SharedModule } from '../../../Shared/infrastructure/Configuration/SharedModule';
import { NodeMailerNotifier } from '../notifiers/NodeMailerNotifier';
import { NotificationResolver } from '../presentation/NotificationResolver';
import { notificationCommandHandlers } from './NotificationCommandHandlers';
import { notificationRepositories } from './NotificationRepositories';

@Module({
  imports: [SharedModule],
  controllers: [],
  providers: [
    {
      provide: 'EMAIL_NOTIFIER',
      inject: ['NOTIFICATION_CONFIGURATION'],
      useFactory: (config) => new NodeMailerNotifier(config.email),
    },
    ...notificationRepositories,
    ...notificationCommandHandlers,
    NotificationResolver,
  ],
  exports: ['NOTIFICATION_REPOSITORY'],
})
export class NotificationModule {}
