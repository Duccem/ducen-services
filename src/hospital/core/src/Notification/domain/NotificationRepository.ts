import { Notification } from './Notification';

export interface NotificationRepository {
  save(notification: Notification): Promise<void>;
}
