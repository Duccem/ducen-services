import { DomainEventClass, DomainEventSubscriber, EmailService } from '@ducen/shared';
import { UserSearcher } from '../../../User/application/SearchUser/UserSearcher';
import { UserRepository } from '../../../User/domain/UserRepository';
import { UserCreated } from '../../../User/domain/events/UserCreated';
import { SendWelcomeEmail } from './SendWelcomeEmail';

export class SendWelcomeEmailOnUserCreated implements DomainEventSubscriber {
  private welcomeEmailSender: SendWelcomeEmail;
  constructor(emailNotifier: EmailService, userRepository: UserRepository) {
    this.welcomeEmailSender = new SendWelcomeEmail(new UserSearcher(userRepository), emailNotifier);
  }
  subscribedTo(): DomainEventClass[] {
    return [UserCreated];
  }
  async on(domainEvent: UserCreated): Promise<void> {
    await this.welcomeEmailSender.execute(domainEvent.toPrimitive().id);
  }
  name(): string {
    return 'ducen.user.send_welcome_email_on_user_created';
  }
}
