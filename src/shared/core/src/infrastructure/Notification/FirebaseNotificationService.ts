import { App, ServiceAccount, initializeApp } from 'firebase-admin/app';
import { MulticastMessage, getMessaging } from 'firebase-admin/messaging';
import { NotificationService } from '../../domain/ports/NotificationService';

export class FirebaseNotifier implements NotificationService {
  private firebaseApp: App;
  public type: string = 'push';
  constructor(
    account: ServiceAccount,
    private readonly imageUrl: string,
  ) {
    this.firebaseApp = initializeApp(account);
  }
  async notify(title: string, body: string, devices: string[], data: { [key: string]: any }): Promise<void> {
    const payload: MulticastMessage = {
      notification: {
        title,
        body,
        imageUrl: this.imageUrl,
      },
      data,
      tokens: devices,
    };
    await getMessaging(this.firebaseApp).sendEachForMulticast(payload);
  }
}
