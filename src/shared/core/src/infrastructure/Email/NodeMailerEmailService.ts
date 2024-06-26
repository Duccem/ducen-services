import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { Transporter, createTransport } from 'nodemailer';
import { resolve } from 'path';
import { EmailService } from '../../domain/ports/EmailService';

export class NodeMailerMailService implements EmailService {
  private transporter: Transporter;
  private readonly fromEmail: string;
  constructor({ username, password, fromEmail }: { username: string; password: string; fromEmail: string }) {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: username,
        pass: password,
      },
    });
    this.fromEmail = fromEmail;
  }
  async sendEmail(
    to: string,
    subject: string,
    template: string,
    data: { [key: string]: any },
  ): Promise<void> {
    const file = readFileSync(resolve(process.cwd(), './src/templates', `${template}.hbs`));
    const compiled = compile(file.toString('utf8'));
    const options = {
      from: `Ducen <${this.fromEmail}>`,
      to,
      subject,
      html: compiled(data),
    };
    await this.transporter.sendMail(options);
  }
}
