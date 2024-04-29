import { Primitives } from '@ducen-services/shared';
import { Notify } from '../../../Notification/application/notify/notify';
import { User } from '../../domain/User';

export class SendWelcomeEmail {
  constructor(private readonly notify: Notify) {}

  async execute(data: Primitives<User>) {
    const user = User.fromPrimitives(data);
    await this.notify.execute({
      userId: user.id.toString(),
      title: `Hello ${user.name.fullName()} Welcome to the hospital`,
      body: 'welcome-email-template',
      types: ['email'],
      data: {
        ...user.toPrimitives(),
      },
    });
  }
}
