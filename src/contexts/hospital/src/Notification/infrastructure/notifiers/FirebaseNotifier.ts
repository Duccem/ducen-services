import { App, ServiceAccount, initializeApp } from 'firebase-admin/app';
import { MulticastMessage, getMessaging } from 'firebase-admin/messaging';
import { compile } from 'handlebars';
import { User } from '../../../User/domain/User';
import { Notification } from '../../domain/Notification';
import { PushNotifier } from '../../domain/Notifier';

export class FirebaseNotifier extends PushNotifier {
  private firebaseApp: App;
  public type: string = 'push';
  constructor(
    account: ServiceAccount,
    private readonly imageUrl: string,
  ) {
    super();
    this.firebaseApp = initializeApp(account);
  }
  async notify(notification: Notification, user: User, data: { [key: string]: any }): Promise<void> {
    const compiled = compile(notification.body.toString());
    const payload: MulticastMessage = {
      notification: {
        title: notification.title.toString(),
        body: compiled(data),
        imageUrl: this.imageUrl,
      },
      data,
      tokens: user.devices.map((device) => device.token.toString()),
    };
    await getMessaging(this.firebaseApp).sendEachForMulticast(payload);
  }
}
