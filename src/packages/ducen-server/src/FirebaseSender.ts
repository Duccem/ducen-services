import { NotificationPayload, NotificationSender } from '@ducen/core';
import admin from 'firebase-admin';
export class FirebaseSender extends NotificationSender {
  private firebaseApp: admin.app.App;
  constructor(serviceAccount: admin.ServiceAccount) {
    super();
    this.firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  async SendPushNotification({ actionUrl = '', data = {}, title, body, devices, userId }: NotificationPayload) {
    const notification = {
      body,
      title,
      data,
      user: userId,
      devices: devices.map((device) => device._id),
      type: 'PUSH',
    };
    const tokens = devices.map((device) => device.token);
    await admin.messaging(this.firebaseApp).sendToDevice(tokens, {
      notification: {
        title,
        body,
        clickAction: actionUrl,
      },
      data,
    });
    return notification;
  }
}
