import {
  ConsoleLogger,
  MongoArranger,
  MongoConnection,
  MongoConnectionFactory,
  UuidMother,
} from '@ducen-services/shared';
import { SearchUserByEmailCriteria } from '../../../../src/User/domain/SearchUserByEmailCriteria';
import { SearchUserByIdCriteria } from '../../../../src/User/domain/SearchUserByIdCriteria';
import { UserRepository } from '../../../../src/User/domain/UserRepository';
import { MongoUserRepository } from '../../../../src/User/infrastructure/Persistence/MongoDB/MongoUserRepository';
import { UserMother } from '../../domain/UserMother';

describe('MongoUserRepository', () => {
  let connection: MongoConnection;
  let arranger: MongoArranger;
  let userRepository: UserRepository;

  beforeAll(async () => {
    connection = await MongoConnectionFactory.create(process.env['MONGO_DB_URL']);
    arranger = new MongoArranger(connection);
    userRepository = new MongoUserRepository(
      connection,
      new ConsoleLogger({ environment: 'test', serviceName: 'test' }),
    );
  });

  afterAll(async () => {
    await arranger.arrange();
    await connection.close();
  });

  beforeEach(async () => {
    await arranger.arrange();
  });

  it('should save a member and find it by id', async () => {
    const user = UserMother.create();
    await userRepository.save(user.id, user);
    const savedUser = await userRepository.getUserByCriteria(new SearchUserByIdCriteria(user.id.value));
    expect(savedUser).toEqual(user);
  });

  it('should get null on search by id', async () => {
    const savedUser = await userRepository.getUserByCriteria(
      new SearchUserByIdCriteria(new UuidMother().generate()),
    );
    expect(savedUser).toEqual(null);
  });

  it('should save a member and find it by email', async () => {
    const user = UserMother.create();
    await userRepository.save(user.id, user);
    const savedUsers = await userRepository.listUsersByCriteria(
      new SearchUserByEmailCriteria(user.email.value),
    );
    expect(savedUsers).toEqual([user]);
  });

  it('should get null on search by email', async () => {
    const savedUsers = await userRepository.listUsersByCriteria();
    expect(savedUsers).toEqual([]);
  });
});
