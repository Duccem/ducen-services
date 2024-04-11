import { EmailSender } from '@ducen/core';
import { IdentifyBy } from '../../domain/IdentifyBy';
import { UserNotExist } from '../../domain/UserNotExist';
import { UserRepository } from '../../domain/UserRepository';

export class RecoveryPassword {
  constructor(
    private readonly userRepository: UserRepository,
    private mailSender: EmailSender,
    private baseUrl: string
  ) {}

  async run(email: string): Promise<void> {
    const user = await this.userRepository.getUserByCriteria(new IdentifyBy('email', email));
    if (!user) throw new UserNotExist();

    await this.mailSender.SendEmail(email, 'Ducen - Recovery Password', 'recovery-password', {
      name: `${user.name.fullName()}`,
      link: `${this.baseUrl}/auth/new-password?id=${user.id.value}`,
    });
  }
}
