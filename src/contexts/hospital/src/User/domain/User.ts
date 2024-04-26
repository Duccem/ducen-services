import { Aggregate, BooleanValueObject, DateValueObject, Email, Image, Primitives, Uuid } from '@ducen-services/shared';
import { IncorrectPassword } from './IncorrectPassword';
import { UserAddress } from './UserAddress';
import { UserBirthDate } from './UserBirthDate';
import { UserConfiguration } from './UserConfiguration';
import { UserCreated } from './UserCreated';
import { UserGender, UserGenders } from './UserGender';
import { UserName } from './UserName';
import { UserPassword } from './UserPassword';
import { UserPhoneNumber } from './UserPhoneNumber';
import { UserRole, UserRoles } from './UserRole';

export class User extends Aggregate {
  constructor(
    id: Uuid,
    public name: UserName,
    public email: Email,
    public password: UserPassword,
    public role: UserRole,
    public birthDate: UserBirthDate,
    public address: UserAddress,
    public phoneNumber: UserPhoneNumber,
    public photo: Image,
    public gender: UserGender,
    public configuration: UserConfiguration,
    public isActive: BooleanValueObject,
    createdAt?: DateValueObject,
    updatedAt?: DateValueObject
  ) {
    super(id, createdAt, updatedAt);
  }

  public static fromPrimitives(data: Primitives<User>): User {
    return new User(
      new Uuid(data.id),
      UserName.fromPrimitives(data.name),
      new Email(data.email),
      new UserPassword(data.password),
      new UserRole(data.role),
      new UserBirthDate(data.birthDate),
      UserAddress.fromPrimitives(data.address),
      new UserPhoneNumber(data.phoneNumber),
      new Image(data.photo),
      new UserGender(data.gender),
      UserConfiguration.fromPrimitives(data.configuration),
      new BooleanValueObject(data.isActive),
      new DateValueObject(data.createdAt || new Date()),
      new DateValueObject(data.updatedAt || new Date())
    );
  }
  public toPrimitives(): Primitives<User> {
    return {
      id: this.id.value,
      name: this.name.toPrimitives(),
      email: this.email.value,
      password: this.password.value,
      role: this.role.value,
      birthDate: this.birthDate.value,
      address: this.address.toPrimitives(),
      phoneNumber: this.phoneNumber.value,
      photo: this.photo.value,
      gender: this.gender.value,
      configuration: this.configuration.toPrimitives(),
      isActive: this.isActive.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  public static create(
    id: string,
    name: {
      firstName: string;
      lastName: string;
    },
    email: string,
    password: string,
    role: string,
    birthDate: Date,
    address: {
      country: string;
      city: string;
      street: string;
      zipCode: string;
      coordinates: { latitude: number; longitude: number };
    },
    phoneNumber: string,
    gender: string,
    photo: string,
    configuration: {
      timezone: string;
      lang: string;
      theme: string;
    },
    createdAt?: Date,
    updatedAt?: Date
  ): User {
    const user = new User(
      new Uuid(id),
      UserName.fromPrimitives(name),
      new Email(email),
      new UserPassword(password),
      new UserRole(role as UserRoles),
      new UserBirthDate(birthDate),
      UserAddress.fromPrimitives(address),
      new UserPhoneNumber(phoneNumber),
      new Image(photo),
      new UserGender(gender as UserGenders),
      UserConfiguration.fromPrimitives(configuration),
      new BooleanValueObject(false),
      new DateValueObject(createdAt || new Date()),
      new DateValueObject(updatedAt || new Date())
    );
    user.record(
      new UserCreated({
        params: user.toPrimitives(),
        aggregateId: user.id.value,
      })
    );
    user.password.encrypt();
    return user;
  }

  public generateToken(): any {
    const payload = {
      userId: this.id.value,
      role: this.role.value,
      email: this.email.value,
      configuration: this.configuration.toPrimitives(),
    };
    return payload;
  }

  public validatePassword(password: string): void {
    if (!this.password.compare(password)) throw new IncorrectPassword();
  }

  public changePassword(newPassword: string, oldPassword: string): void {
    if (!this.password.compare(oldPassword)) throw new IncorrectPassword();
    this.password = new UserPassword(newPassword);
    this.password.encrypt();
  }
}
