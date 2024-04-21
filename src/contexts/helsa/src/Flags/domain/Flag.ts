import { Aggregate, BooleanValueObject, DateValueObject, Primitives, StringValueObject, Uuid } from '@ducen/core';
import { User } from '../../User/domain/User';
import { FlagAttributes } from './FlagAttributes';
import { HandlerFactory } from './HandlerFactory';

export class Flag extends Aggregate {
  constructor(
    public id: Uuid,
    public name: StringValueObject,
    public attributes: FlagAttributes,
    public handlers: StringValueObject[],
    public enabled: BooleanValueObject,
    public createdAt: DateValueObject,
    public updatedAt: DateValueObject,
  ) {
    super(id, createdAt, updatedAt);
  }

  public toPrimitives(): Primitives<Flag> {
    return {
      id: this.id.value,
      name: this.name.value,
      attributes: this.attributes.value,
      handlers: this.handlers.map((handler) => handler.value),
      enabled: this.enabled.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  static fromPrimitives(data: Primitives<Flag>): Flag {
    return new Flag(
      new Uuid(data.id),
      new StringValueObject(data.name),
      new FlagAttributes(data.attributes),
      data.handlers.map((handler) => new StringValueObject(handler)),
      new BooleanValueObject(data.enabled),
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt),
    );
  }

  static create(
    id: string,
    name: string,
    attributes: { [key: string]: any },
    handlers: string[],
    enabled: boolean,
  ): Flag {
    return new Flag(
      new Uuid(id),
      new StringValueObject(name),
      new FlagAttributes(attributes),
      handlers.map((handler) => new StringValueObject(handler)),
      new BooleanValueObject(enabled),
      new DateValueObject(new Date()),
      new DateValueObject(new Date()),
    );
  }

  isEnabled(user: User): boolean {
    return this.handlers.reduce((acc, handler) => {
      return acc && HandlerFactory.create(handler.value, this, user).handle(this.attributes.value);
    }, true);
  }
}
