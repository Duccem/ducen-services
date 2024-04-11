import { EventBus, Primitives } from '@ducen/core';
import { IdentifyBy } from '../../domain/IdentifyBy';

import { User } from '../../domain/User';
import { UserAlreadyExistError } from '../../domain/UserAlreadyExist';
import { UserRepository } from '../../domain/UserRepository';

export class UserRegistrar {
  constructor(private readonly repository: UserRepository, private readonly eventBus: EventBus) {}

  async register(user: Primitives<User>) {
    const existUser = await this.repository.getUserByCriteria(new IdentifyBy('email', user.email));
    if (existUser) throw new UserAlreadyExistError(user.email);

    const newUser = User.create(
      user.id,
      user.name,
      user.email,
      user.password,
      user.role,
      user.birthDate,
      user.address,
      user.phoneNumber,
      user.gender,
      user.photo,
      user.configuration,
      user.createdAt,
      user.updatedAt
    );

    await this.repository.save(newUser.id, newUser);
    await this.eventBus.publish(newUser.pullDomainEvents());
  }
}
