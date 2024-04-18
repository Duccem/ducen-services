import { WordMother } from '@ducen/core';

import { MockUserRepository } from '../../__mocks__/MockUserRepository';

import { ChangePasswordHandler } from '../../../../src/User/application/ChangePassword/ChangePasswordHandler';
import { IdentifyBy } from '../../../../src/User/domain/IdentifyBy';
import { IncorrectPassword } from '../../../../src/User/domain/IncorrectPassword';
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
    repository.assertGetUserByCriteriaHaveBeenCalledWith(new IdentifyBy('id', user.id.value));
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
    const command = ChangePasswordCommandMother.create(member.id.value, WordMother.random({ maxLength: 13 }));
    member.password.encrypt();
    repository.returnOnGetUserByCriteria(member);
    await expect(handler.handle(command)).rejects.toBeInstanceOf(IncorrectPassword);
  });
});
