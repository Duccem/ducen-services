import { readFileSync } from 'fs';
import { compile } from 'handlebars';
import { resolve } from 'path';
import { Resend } from 'resend';
import { EmailService } from '../../domain/ports/EmailService';

export class ResendEmailService implements EmailService {
  private resend: Resend;
  constructor(apiKey: string) {
    this.resend = new Resend(apiKey);
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
      from: `onboarding@resend.dev`,
      to: [to],
      subject,
      html: compiled(data),
    };
    await this.resend.emails.send(options);
  }
}
