import { User } from '../../User/domain/User';
import { Notification } from './Notification';

export interface Notifier {
  type: string;
  notify(notification: Notification, user: User, data: { [key: string]: any }): Promise<void>;
}

export abstract class EmailNotifier implements Notifier {
  type = 'email';
  abstract notify(notification: Notification, user: User, data: { [key: string]: any }): Promise<void>;
}

export abstract class PushNotifier implements Notifier {
  type = 'push';
  abstract notify(notification: Notification, user: User, data: { [key: string]: any }): Promise<void>;
}
