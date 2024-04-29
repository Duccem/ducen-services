import { User } from '../../User/domain/User';
import { Notification } from './Notification';

export interface Notifier {
  type: string;
  notify(notification: Notification, user: User, data: { [key: string]: any }): Promise<void>;
}
