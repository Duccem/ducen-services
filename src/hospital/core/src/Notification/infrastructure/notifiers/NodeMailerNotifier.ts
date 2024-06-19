import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { Transporter, createTransport } from 'nodemailer';
import { resolve } from 'path';
import { User } from '../../../User/domain/User';
import { Notification } from '../../domain/Notification';
import { EmailNotifier } from '../../domain/Notifier';

export class NodeMailerNotifier extends EmailNotifier {
  public type = 'email';
  private transporter: Transporter;
  private readonly fromEmail: string;
  constructor({ username, password, fromEmail }: { username: string; password: string; fromEmail: string }) {
    super();
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: username,
        pass: password,
      },
    });
    this.fromEmail = fromEmail;
  }
  async notify(notification: Notification, user: User, data: { [key: string]: any }): Promise<void> {
    const file = readFileSync(resolve(process.cwd(), './src/templates', `${notification.body.toString()}.hbs`));
    const compiled = compile(file.toString('utf8'));
    const options = {
      from: `Ducen <${this.fromEmail}>`,
      to: user.email.toString(),
      subject: notification.title.toString(),
      html: compiled(data),
    };
    await this.transporter.sendMail(options);
  }
}
