import { SearchUserByEmailCriteria } from '../../../User/domain/criteria/SearchUserByEmailCriteria';
import { UserRepository } from '../../../User/domain/UserRepository';
import { Notification } from '../../domain/Notification';
import { NotificationRepository } from '../../domain/NotificationRepository';
import { EmailNotifier } from '../../domain/Notifier';

export class SendEmailRecoveryCode {
  static TITLE = '{{name}} Here is your recovery code';
  static BODY = 'verify-code-recovery-password';
  constructor(
    private readonly repository: NotificationRepository,
    private readonly userRepository: UserRepository,
    private readonly notifier: EmailNotifier,
  ) {}

  async run(email: string): Promise<void> {
    const user = await this.userRepository.getUserByCriteria(new SearchUserByEmailCriteria(email));
    if (!user) throw new Error('User not found');
    user.generateVerificationCode();
    const data = {
      code: user.verificationCode.toString(),
      name: user.name.fullName(),
    };
    const notification = Notification.Create(
      user.id.toString(),
      SendEmailRecoveryCode.TITLE.replace('{{name}}', user.name.fullName()),
      SendEmailRecoveryCode.BODY,
      ['email'],
      data,
    );
    const template = await this.repository.getTemplate(notification.body.toString());
    if (template) {
      notification.setTemplate(template);
    }
    await this.repository.save(notification);
    await this.userRepository.save(user.id, user);
    await this.notifier.notify(notification, user, data);
  }
}
