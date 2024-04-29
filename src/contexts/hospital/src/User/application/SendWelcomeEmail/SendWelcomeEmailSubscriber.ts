import { DomainEventClass, DomainEventSubscriber } from '@ducen-services/shared';
import { Notify } from '../../../Notification/application/notify/notify';
import { NotificationRepository } from '../../../Notification/domain/NotificationRepository';
import { Notifier } from '../../../Notification/domain/Notifier';
import { UserCreated } from '../../domain/UserCreated';
import { UserRepository } from '../../domain/UserRepository';
import { SendWelcomeEmail } from './SendWelcomeEmail';

export class SendWelcomeEmailSubscriber implements DomainEventSubscriber {
  private welcomeEmailSender: SendWelcomeEmail;
  constructor(userRepository: UserRepository, notificationRepository: NotificationRepository, emailNotifier: Notifier) {
    this.welcomeEmailSender = new SendWelcomeEmail(new Notify(notificationRepository, userRepository, [emailNotifier]));
  }
  subscribedTo(): DomainEventClass[] {
    return [UserCreated];
  }
  async on(domainEvent: UserCreated): Promise<void> {
    await this.welcomeEmailSender.execute(domainEvent.toPrimitive());
  }
  name(): string {
    return 'ducen.user.send_welcome_email_on_user_created';
  }
}
