import { DomainEventClass, DomainEventSubscriber, Primitives } from '@ducen/shared';
import { Notification } from '../../domain/Notification';
import { NotificationRepository } from '../../domain/NotificationRepository';
import { NotificationSent } from '../../domain/NotificationSent';
import { SaveNotification } from './SaveNotification';

export class SaveNotificationOnNotificationSent implements DomainEventSubscriber {
  private saver: SaveNotification;
  constructor(notificationRepository: NotificationRepository) {
    this.saver = new SaveNotification(notificationRepository);
  }

  subscribedTo(): DomainEventClass[] {
    return [NotificationSent];
  }

  async on(domainEvent: NotificationSent): Promise<any> {
    await this.saver.execute(domainEvent.aggregate as Primitives<Notification>);
  }
  name(): string {
    return 'OnNotificationSent';
  }
}
