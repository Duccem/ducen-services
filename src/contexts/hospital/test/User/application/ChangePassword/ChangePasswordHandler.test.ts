import { WordMother } from '@ducen-services/shared';

import { MockUserRepository } from '../../__mocks__/MockUserRepository';

import { ChangePasswordHandler } from '../../../../src/User/application/ChangePassword/ChangePasswordHandler';
import { IncorrectPassword } from '../../../../src/User/domain/IncorrectPassword';
import { SearchUserByIdCriteria } from '../../../../src/User/domain/SearchUserByIdCriteria';
import { UserNotExist } from '../../../../src/User/domain/UserNotExist';
import { UserMother } from '../../domain/UserMother';
import { ChangePasswordCommandMother } from './ChangePasswordCommandMother';

describe('ChangePasswordHandler', () => {
  let repository: MockUserRepository;
  let handler: ChangePasswordHandler;

  beforeEach(() => {
    repository = new MockUserRepository();
    handler = new ChangePasswordHandler(repository);
  });

  it('should change the password of a user', async () => {
    const user = UserMother.create();
    const command = ChangePasswordCommandMother.create(user.id.value, user.password.value);
    user.password.encrypt();
    repository.returnOnGetUserByCriteria(user);
    await handler.handle(command);
    repository.assertGetUserByCriteriaHaveBeenCalledWith(new SearchUserByIdCriteria(user.id.value));
    repository.assertSaveHaveBeenCalledWith(user.id, user);
  });

  it('should throw UserNotExist Error', async () => {
    const user = UserMother.create();
    const command = ChangePasswordCommandMother.create(user.id.value, user.password.value);
    repository.returnOnGetUserByCriteria(null);
    await expect(handler.handle(command)).rejects.toBeInstanceOf(UserNotExist);
  });

  it('should throw IncorrectPassword Error', async () => {
    const member = UserMother.create();
    const command = ChangePasswordCommandMother.create(
      member.id.value,
      new WordMother().generate({ maxLength: 13 }),
    );
    member.password.encrypt();
    repository.returnOnGetUserByCriteria(member);
    await expect(handler.handle(command)).rejects.toBeInstanceOf(IncorrectPassword);
  });
});
