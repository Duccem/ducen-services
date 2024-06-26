import { Email } from '@ducen/shared';

export class UserEmail extends Email {
  constructor(value: string) {
    super(value);
  }

  sendWelcomeEmail(name: string) {
    return {
      to: this.value,
      title: 'Welcome to the platform',
      body: `Hello ${name}, welcome to the platform`,
      data: {
        name,
      },
    };
  }
}
