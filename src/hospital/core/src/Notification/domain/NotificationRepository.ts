import { Notification } from './Notification';
import { Template } from './Template';

export interface NotificationRepository {
  save(notification: Notification): Promise<void>;
  getTemplate(name: string): Promise<Template>;
}
