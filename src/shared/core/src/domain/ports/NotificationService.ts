export interface NotificationService {
  notify(title: string, body: string, devices: string[], data: { [key: string]: any }): Promise<void>;
}
