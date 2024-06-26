import { LoginHandler } from '../../../../src/User/application/Login/LoginHandler';
import { LoginQuery } from '../../../../src/User/application/Login/LoginQuery';
import { SearchUserByIdCriteria } from '../../../../src/User/domain/criteria/SearchUserByIdCriteria';
import { IncorrectPassword } from '../../../../src/User/domain/errors/IncorrectPassword';
import { UserNotExist } from '../../../../src/User/domain/errors/UserNotExist';
import { MockUserRepository } from '../../__mocks__/MockUserRepository';
import { UserMother } from '../../domain/UserMother';

describe('LoginHandler', () => {
  let userRepository: MockUserRepository;
  let handler: LoginHandler;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    handler = new LoginHandler(userRepository, { authKey: 'auth-key' });
    jest.useFakeTimers().setSystemTime(new Date('2021-01-01'));
  });

  it('should login a user', async () => {
    const user = UserMother.create({ isActive: true });
    const query = new LoginQuery(user.email.value, user.password.value);
    user.password.encrypt();

    userRepository.returnOnGetUserByCriteria(user);
    const response = await handler.handle(query);

    userRepository.assertGetUserByCriteriaHaveBeenCalledWith(new SearchUserByIdCriteria(user.email.value));
    expect(response).toEqual({
      token: user.generateToken('auth-key'),
      user: user.toPrimitives(),
    });
  });

  it('should be incorrect password error throws', async () => {
    const user = UserMother.create();
    const query = new LoginQuery(user.email.value, 'invalid-password');
    user.password.encrypt();

    userRepository.returnOnGetUserByCriteria(user);
    await expect(handler.handle(query)).rejects.toBeInstanceOf(IncorrectPassword);
  });

  it('should be incorrect password error throws', async () => {
    const query = new LoginQuery('correo', 'invalid-password');
    userRepository.returnOnGetUserByCriteria(null);
    await expect(handler.handle(query)).rejects.toBeInstanceOf(UserNotExist);
  });
});
