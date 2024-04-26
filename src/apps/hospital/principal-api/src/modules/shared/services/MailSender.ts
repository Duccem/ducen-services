/* eslint-disable @typescript-eslint/no-var-requires */
import { EmailSender } from '@ducen-services/shared';
import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { Transporter, createTransport } from 'nodemailer';
import { join } from 'path';

export class MailSender extends EmailSender {
  private transporter: Transporter;
  constructor(
    private readonly fromEmail: string,
    username: string,
    password: string,
    private readonly templatePath: string
  ) {
    super();
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: username,
        pass: password,
      },
    });
  }

  async SendEmail(email: string, title: string, templateName: string, data = {}) {
    const source = readFileSync(join(process.cwd(), this.templatePath, `${templateName}.hbs`), 'utf8');
    const template = compile(source);
    const options = {
      from: `Ducen <${this.fromEmail}>`,
      to: email,
      subject: title,
      html: template({ ...data }),
    };

    await this.transporter.sendMail(options);
  }
}
