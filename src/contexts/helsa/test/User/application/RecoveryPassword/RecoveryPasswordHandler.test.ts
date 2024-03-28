import { RecoveryPasswordHandler } from '../../../../src/User/application/RecoveryPassword/RecoveryPasswordHandler';
import { IdentifyBy } from '../../../../src/User/domain/IdentifyBy';
import { UserNotExist } from '../../../../src/User/domain/UserNotExist';
import { MockMailSender } from '../../../__mocks__/MockMailSender';
import { MockUserRepository } from '../../__mocks__/MockUserRepository';
import { UserMother } from '../../domain/UserMother';
import { RecoveryPasswordCommandMother } from './RecoveryPasswordCommandMother';

describe('RecoveryPasswordHandler', () => {
  let userRepository: MockUserRepository;
  let mailSender: MockMailSender;
  let handler: RecoveryPasswordHandler;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    mailSender = new MockMailSender();
    handler = new RecoveryPasswordHandler(userRepository, mailSender, 'http://localhost:3000');
  });

  it('should send email with recovery password link', async () => {
    const user = UserMother.create();
    const command = RecoveryPasswordCommandMother.create();
    userRepository.returnOnGetUserByCriteria(user);

    await handler.handle(command);
    userRepository.assertGetUserByCriteriaHaveBeenCalledWith(new IdentifyBy('email', command.email));
    mailSender.assertSendEmailHaveBeenCalledWith(command.email, 'Ducen - Recovery Password', 'recovery-password', {
      name: `${user.name.fullName()}`,
      link: `http://localhost:3000/auth/new-password?id=${user.id.value}`,
    });
  });

  it('should throw error when user not exist', async () => {
    const command = RecoveryPasswordCommandMother.create();
    userRepository.returnOnGetUserByCriteria(undefined);

    await expect(handler.handle(command)).rejects.toBeInstanceOf(UserNotExist);
    userRepository.assertGetUserByCriteriaHaveBeenCalledWith(new IdentifyBy('email', command.email));
  });
});
