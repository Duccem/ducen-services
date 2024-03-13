export type NotificationDevice = {
  _id: string;
  token: string;
};
export type NotificationPayload = {
  userId: string;
  devices: NotificationDevice[];
  title: string;
  body: string;
  data: any;
  actionUrl: string;
};
export abstract class NotificationSender {
  public abstract SendPushNotification(payload: NotificationPayload): any;
}
