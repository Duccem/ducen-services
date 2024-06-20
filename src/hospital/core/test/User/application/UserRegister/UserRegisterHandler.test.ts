import { UserRegisterHandler } from '../../../../src/User/application/RegisterUser/UserRegisterHandler';
import { PasswordFormatError } from '../../../../src/User/domain/errors/PasswordFormatError';
import { UserAlreadyExistError } from '../../../../src/User/domain/errors/UserAlreadyExist';
import { EventBusMock } from '../../../__mocks__/EventBusMock';
import { MockUserRepository } from '../../__mocks__/MockUserRepository';
import { UserCreatedDomainEventMother } from '../../domain/UserCreatedMother';
import { UserMother } from '../../domain/UserMother';

import { UserRegisterCommandMother } from '../../domain/UserRegisterCommandMother';

describe('UserRegisterHandler', () => {
  let userRepository: MockUserRepository;
  let handler: UserRegisterHandler;
  let eventBus: EventBusMock;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    eventBus = new EventBusMock();
    handler = new UserRegisterHandler(userRepository, eventBus);
    jest.useFakeTimers().setSystemTime(new Date('2021-01-01'));
  });

  it('should register an user', async () => {
    const user = UserMother.create();
    const command = UserRegisterCommandMother.fromPrimitives(user.toPrimitives());
    const event = UserCreatedDomainEventMother.fromUser(user);

    await handler.handle(command);
    expect(userRepository.saveMock).toHaveBeenCalled();
    eventBus.assertLastPublishedEventIs(event);
  });

  it('should find the user by email and throw a MemberAlreadyExist Error', async () => {
    const user = UserMother.create();
    const command = UserRegisterCommandMother.fromPrimitives(user.toPrimitives());
    userRepository.returnOnGetUserByCriteria(user);
    await expect(handler.handle(command)).rejects.toBeInstanceOf(UserAlreadyExistError);
  });

  it('should throw a PasswordFormatIncorrect Error', async () => {
    const user = UserMother.create();
    const command = UserRegisterCommandMother.fromPrimitives({
      ...user.toPrimitives(),
      password: '123',
    });
    await expect(handler.handle(command)).rejects.toBeInstanceOf(PasswordFormatError);
  });
});
