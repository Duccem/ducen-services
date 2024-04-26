import { Criteria, Nullable, Uuid } from '@ducen-services/shared';
import { User } from './User';

export interface UserRepository {
  save(id: Uuid, user: User): Promise<void>;
  getUserByCriteria(criteria: Criteria): Promise<Nullable<User>>;
  listUsersByCriteria(criteria?: Criteria): Promise<Nullable<User[]>>;
}
