import { Notification, User } from '../..';
import { EmailNotifier } from '../../src/Notification/domain/Notifier';

export class MockMailSender implements EmailNotifier {
  sendEmailMock: jest.Mock = jest.fn();
  type: string = 'email';
  async notify(notification: Notification, user: User, data: { [key: string]: any }): Promise<void> {
    this.sendEmailMock(notification, user, data);
  }

  assertSendEmailHaveBeenCalledWith(notification: Notification, user: User, data: { [key: string]: any }) {
    expect(this.sendEmailMock).toHaveBeenCalledWith(notification, user, data);
  }
}
