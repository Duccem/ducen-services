import { EmailService } from '@ducen/shared';
import { UserRepository } from '../../../User/domain/UserRepository';
import { SearchUserByEmailCriteria } from '../../../User/domain/criteria/SearchUserByEmailCriteria';

export class SendEmailRecoveryCode {
  static TITLE = '{{name}} Here is your recovery code';
  static BODY = 'verify-code-recovery-password';
  constructor(
    private readonly repository: UserRepository,
    private readonly notifier: EmailService,
  ) {}

  async run(email: string): Promise<void> {
    const user = await this.repository.getUserByCriteria(new SearchUserByEmailCriteria(email));
    if (!user) throw new Error('User not found');
    user.generateVerificationCode();
    const data = {
      code: user.verificationCode.toString(),
      name: user.name.fullName(),
    };
    await this.repository.save(user.id, user);
    await this.notifier.sendEmail(
      user.email.value,
      SendEmailRecoveryCode.TITLE,
      SendEmailRecoveryCode.BODY,
      data,
    );
  }
}
