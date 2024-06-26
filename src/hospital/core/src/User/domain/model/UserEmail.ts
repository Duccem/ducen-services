import { Email } from '@ducen/shared';

export interface EmailData {
  to: string;
  title: string;
  body: string;
  data: Record<string, unknown>;
}

export class UserEmail extends Email {
  constructor(value: string) {
    super(value);
  }

  sendWelcomeEmail(name: string): EmailData {
    return {
      to: this.value,
      title: 'Welcome to the platform',
      body: `Hello ${name}, welcome to the platform`,
      data: {
        name,
      },
    };
  }

  sendVerificationCodeEmail(code: string, name: string): EmailData {
    return {
      to: this.value,
      title: `${name} Here is your recovery code`,
      body: 'verify-code-recovery-password',
      data: {
        code,
        name,
      },
    };
  }
}
