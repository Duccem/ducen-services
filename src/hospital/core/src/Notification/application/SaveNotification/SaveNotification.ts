import { Primitives } from '@ducen/shared';
import { Notification } from '../../domain/Notification';
import { NotificationRepository } from '../../domain/NotificationRepository';

export class SaveNotification {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async execute(data: Primitives<Notification>): Promise<void> {
    const notification = Notification.Create(data.userId, data.title, data.body, data.types, data.data);
    await this.notificationRepository.save(notification);
  }
}
