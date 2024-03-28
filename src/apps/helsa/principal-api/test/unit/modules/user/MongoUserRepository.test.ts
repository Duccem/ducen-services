import { IdentifyBy, UserRepository } from '@helsa/modules';
import { ConsoleLogger, MongoConnection } from '@shared/adapters-server';
import { UuidMother } from '@shared/core';
import { MongoUserRepository } from '../../../../src/modules/user/adapters/persistance/MongoDB/MongoUserRepository';
import { MongoArranger } from './mothers/MongoArranger';
import { MongoConnectionMother } from './mothers/MongoConnectionMother';
import { UserMother } from './mothers/UserMother';

describe('MongoUserRepository', () => {
  let connection: MongoConnection;
  let arranger: MongoArranger;
  let userRepository: UserRepository;

  beforeAll(async () => {
    connection = await MongoConnectionMother.create();
    arranger = new MongoArranger(connection);
    userRepository = new MongoUserRepository(
      connection,
      new ConsoleLogger({ environment: 'test', serviceName: 'test' }),
    );
  });

  afterAll(async () => {
    await arranger.arrange();
    await connection.client.close();
  });

  beforeEach(async () => {
    await arranger.arrange();
  });

  it('should save a member and find it by id', async () => {
    const user = UserMother.create();
    await userRepository.save(user.id, user);
    const savedUser = await userRepository.getUserByCriteria(new IdentifyBy('id', user.id.value));
    expect(savedUser).toEqual(user);
  });

  it('should get null on search by id', async () => {
    const savedUser = await userRepository.getUserByCriteria(new IdentifyBy('id', UuidMother.random()));
    expect(savedUser).toEqual(null);
  });

  it('should save a member and find it by email', async () => {
    const user = UserMother.create();
    await userRepository.save(user.id, user);
    const savedUsers = await userRepository.listUsersByCriteria(new IdentifyBy('email', user.email.value));
    expect(savedUsers).toEqual([user]);
  });

  it('should get null on search by email', async () => {
    const savedUsers = await userRepository.listUsersByCriteria();
    expect(savedUsers).toEqual([]);
  });
});
