import { UserSearcher } from '../../../User/application/UserSearcher/UserSearcher';
import { Notification } from '../../domain/Notification';
import { NotificationRepository } from '../../domain/NotificationRepository';
import { EmailNotifier } from '../../domain/Notifier';

export class SendWelcomeEmail {
  static TITLE = 'Hello {{name}} Welcome to the hospital';
  static BODY = 'welcome-email-template';
  constructor(
    private readonly repository: NotificationRepository,
    private readonly userSearcher: UserSearcher,
    private readonly notifier: EmailNotifier,
  ) {}

  async execute(userId: string) {
    const user = await this.userSearcher.run(userId);
    const notification = Notification.Create(
      user.id.toString(),
      SendWelcomeEmail.TITLE.replace('{{name}}', user.name.toString()),
      SendWelcomeEmail.BODY,
      ['email'],
      user.toPrimitives(),
    );
    const template = await this.repository.getTemplate(notification.body.toString());
    if (template) {
      notification.setTemplate(template);
    }
    await this.repository.save(notification);
    await this.notifier.notify(notification, user, user.toPrimitives());
  }
}
