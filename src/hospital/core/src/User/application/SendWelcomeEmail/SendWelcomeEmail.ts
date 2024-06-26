import { EmailService, EventBus } from '@ducen/shared';
import { UserSearcher } from '../../../User/application/SearchUser/UserSearcher';

export class SendWelcomeEmail {
  constructor(
    private readonly userSearcher: UserSearcher,
    private readonly emailService: EmailService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(userId: string) {
    const user = await this.userSearcher.run(userId);
    const data = user.sendWelcomeEmail();
    await this.emailService.sendEmail(data.to, data.title, data.body, data.data);
    this.eventBus.publish(user.pullDomainEvents());
  }
}
