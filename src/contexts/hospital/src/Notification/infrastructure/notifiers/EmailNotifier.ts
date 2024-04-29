import { compile } from 'handlebars';
import { Transporter, createTransport } from 'nodemailer';
import { User } from '../../../User/domain/User';
import { Notification } from '../../domain/Notification';
import { Notifier } from '../../domain/Notifier';

export class EmailNotifier implements Notifier {
  public type: string = 'email';
  private transporter: Transporter;
  constructor(
    username: string,
    password: string,
    private readonly fromEmail: string,
  ) {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: username,
        pass: password,
      },
    });
  }
  async notify(notification: Notification, user: User, data: { [key: string]: any }): Promise<void> {
    const compiled = compile(notification.body.toString());
    const options = {
      from: `Ducen <${this.fromEmail}>`,
      to: user.email.toString(),
      subject: notification.title.toString(),
      html: compiled(data),
    };
    await this.transporter.sendMail(options);
  }
}
