import { Criteria, Nullable, Uuid } from '@ducen/core';
import { User } from './User';

export interface UserRepository {
  save(id: Uuid, user: User): Promise<void>;
  getUserByCriteria(criteria: Criteria): Promise<Nullable<User>>;
  listUsersByCriteria(criteria?: Criteria): Promise<Nullable<User[]>>;
}

export interface UserClientRepository {
  login(username: string, password: string): Promise<{ user: User; token: string }>;
  create(user: User): Promise<void>;
  recoveryPassword(email: string): Promise<void>;
  changePassword(memberId: string, newPassword: string, oldPassword: string): Promise<void>;
}
