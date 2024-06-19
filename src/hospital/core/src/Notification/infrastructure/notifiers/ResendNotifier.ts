import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { resolve } from 'path';
import { Resend } from 'resend';
import { User } from '../../../User/domain/User';
import { Notification } from '../../domain/Notification';
import { EmailNotifier } from '../../domain/Notifier';

export class ResendNotifier extends EmailNotifier {
  public type = 'email';
  private resend: Resend;
  constructor(apiKey: string) {
    super();
    this.resend = new Resend(apiKey);
  }
  async notify(notification: Notification, user: User, data: { [key: string]: any }): Promise<void> {
    const file = readFileSync(resolve(process.cwd(), './src/templates', `${notification.body.toString()}.hbs`));
    const compiled = compile(file.toString('utf8'));
    const options = {
      from: `onboarding@resend.dev`,
      to: [user.email.toString()],
      subject: notification.title.toString(),
      html: compiled(data),
    };
    await this.resend.emails.send(options);
  }
}
