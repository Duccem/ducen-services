import { DomainEventClass, DomainEventSubscriber } from '@ducen/core';
import { UserCreated } from '../../domain/UserCreated';

export class SendWelcomeEmailSubscriber implements DomainEventSubscriber {
  subscribedTo(): DomainEventClass[] {
    return [UserCreated];
  }
  async on(domainEvent: UserCreated): Promise<void> {
    console.log('SendWelcomeEmailSubscriber', domainEvent);
  }
  name(): string {
    return 'ducen.user.send_welcome_email_on_user_created';
  }
}
