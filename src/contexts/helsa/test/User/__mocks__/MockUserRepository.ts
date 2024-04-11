import { Criteria, Nullable, Uuid } from '@ducen/core';
import { User } from '../../../src/User/domain/User';
import { UserRepository } from '../../../src/User/domain/UserRepository';

export class MockUserRepository implements UserRepository {
  getUserByCriteriaMock: jest.Mock = jest.fn();
  listUsersByCriteriaMock: jest.Mock = jest.fn();
  saveMock: jest.Mock = jest.fn();
  getUserByCriteria(criteria: Criteria): Promise<User> {
    return this.getUserByCriteriaMock(criteria);
  }
  listUsersByCriteria(criteria: Criteria): Promise<User[]> {
    return this.listUsersByCriteriaMock(criteria);
  }

  async save(id: Uuid, user: User): Promise<void> {
    await this.saveMock(id, user);
  }

  assertGetUserByCriteriaHaveBeenCalledWith(criteria: Criteria): void {
    expect(this.getUserByCriteriaMock).toHaveBeenCalledWith(criteria);
  }

  assertListUsersByCriteriaHaveBeenCalledWith(criteria: Criteria): void {
    expect(this.listUsersByCriteriaMock).toHaveBeenCalledWith(criteria);
  }

  assertSaveHaveBeenCalledWith(id: Uuid, user: User): void {
    expect(this.saveMock).toHaveBeenCalledWith(id, user);
  }

  returnOnGetUserByCriteria(user: Nullable<User>): void {
    this.getUserByCriteriaMock.mockReturnValue(user);
  }

  returnOnListUsersByCriteria(users: User[]): void {
    this.listUsersByCriteriaMock.mockReturnValue(users);
  }
}
