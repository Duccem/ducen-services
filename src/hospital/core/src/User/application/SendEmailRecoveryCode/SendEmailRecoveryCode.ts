import { EmailService } from '@ducen/shared';
import { UserRepository } from '../../../User/domain/UserRepository';
import { SearchUserByEmailCriteria } from '../../../User/domain/criteria/SearchUserByEmailCriteria';
import { UserNotExist } from '../../domain/errors/UserNotExist';

export class SendEmailRecoveryCode {
  static TITLE = '{{name}} Here is your recovery code';
  static BODY = 'verify-code-recovery-password';
  constructor(
    private readonly repository: UserRepository,
    private readonly notifier: EmailService,
  ) {}

  async run(email: string): Promise<void> {
    const user = await this.repository.getUserByCriteria(new SearchUserByEmailCriteria(email));
    if (!user) throw new UserNotExist();
    user.generateVerificationCode();
    const data = user.sendVerificationCodeEmail();
    await this.repository.save(user.id, user);
    await this.notifier.sendEmail(data.to, data.title, data.body, data.data);
  }
}
