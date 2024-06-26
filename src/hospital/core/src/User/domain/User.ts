import {
  Aggregate,
  AuthorizationError,
  BooleanValueObject,
  DateValueObject,
  File,
  Primitives,
  StringValueObject,
  Uuid,
} from '@ducen/shared';
import crypto from 'crypto';
import { differenceInHours } from 'date-fns';
import * as jwt from 'jsonwebtoken';
import { NotificationSent } from '../../Notification/domain/NotificationSent';
import { IncorrectPassword } from './errors/IncorrectPassword';
import { UserCreated } from './events/UserCreated';
import { Device } from './model/Device';
import { UserAddress } from './model/UserAddress';
import { UserBirthDate } from './model/UserBirthDate';
import { UserConfiguration } from './model/UserConfiguration';
import { EmailData, UserEmail } from './model/UserEmail';
import { UserGender, UserGenders } from './model/UserGender';
import { UserName } from './model/UserName';
import { UserPassword } from './model/UserPassword';
import { UserPhoneNumber } from './model/UserPhoneNumber';
import { UserRole, UserRoles } from './model/UserRole';

export class User extends Aggregate {
  constructor(
    id: Uuid,
    public name: UserName,
    public email: UserEmail,
    public password: UserPassword,
    public role: UserRole,
    public birthDate: UserBirthDate,
    public address: UserAddress,
    public phoneNumber: UserPhoneNumber,
    public photo: File,
    public gender: UserGender,
    public configuration: UserConfiguration,
    public devices: Device[],
    public isActive: BooleanValueObject,
    public verificationCode?: StringValueObject,
    createdAt?: DateValueObject,
    updatedAt?: DateValueObject,
  ) {
    super(id, createdAt, updatedAt);
  }

  public static fromPrimitives(data: Primitives<User>): User {
    return new User(
      new Uuid(data.id),
      UserName.fromPrimitives(data.name),
      new UserEmail(data.email),
      new UserPassword(data.password),
      new UserRole(data.role),
      new UserBirthDate(data.birthDate),
      UserAddress.fromPrimitives(data.address),
      new UserPhoneNumber(data.phoneNumber),
      new File(data.photo),
      new UserGender(data.gender),
      UserConfiguration.fromPrimitives(data.configuration),
      data.devices ? data.devices.map((device) => Device.fromPrimitives(device)) : [],
      new BooleanValueObject(data.isActive),
      data.verificationCode ? new StringValueObject(data.verificationCode) : null,
      new DateValueObject(data.createdAt),
      new DateValueObject(data.updatedAt),
    );
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
    devices: {
      agent: string;
      token: string;
    }[],
  ): User {
    const user = new User(
      new Uuid(id),
      UserName.fromPrimitives(name),
      new UserEmail(email),
      new UserPassword(password),
      new UserRole(role as UserRoles),
      new UserBirthDate(birthDate),
      UserAddress.fromPrimitives(address),
      new UserPhoneNumber(phoneNumber),
      new File(photo),
      new UserGender(gender as UserGenders),
      UserConfiguration.fromPrimitives(configuration),
      [],
      new BooleanValueObject(false),
      null,
      new DateValueObject(new Date()),
      new DateValueObject(new Date()),
    );
    user.record(
      new UserCreated({
        aggregate: user.toPrimitives(),
      }),
    );
    user.password.encrypt();
    return user;
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
      devices: this.devices.map((device) => device.toPrimitives()),
      isActive: this.isActive.getValue(),
      verificationCode: this.verificationCode?.toString(),
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
    };
  }

  public generateToken(signature: string): string {
    const payload = {
      userId: this.id.value,
      role: this.role.value,
      email: this.email.value,
      configuration: this.configuration.toPrimitives(),
    };
    const token = jwt.sign(payload, signature, { expiresIn: 60 * 60 * 24 });
    return token;
  }

  public validatePassword(password: string): void {
    if (!this.password.compare(password)) throw new IncorrectPassword();
  }

  public changePassword(newPassword: string, oldPassword: string): void {
    if (!this.password.compare(oldPassword)) throw new IncorrectPassword();
    this.password = new UserPassword(newPassword);
    this.password.encrypt();
  }

  public updateProfileImage(photo: string): void {
    this.photo = new File(photo);
  }

  public generateVerificationCode(): void {
    if (this.verificationCode && differenceInHours(this.updatedAt.getValue(), new Date()) < 1) return;
    const code = crypto.randomInt(0, 9999).toString().padStart(4, '0');
    console.log(code);
    this.verificationCode = new StringValueObject(code);
  }

  public verifyCode(code: string): void {
    if (
      !this.verificationCode ||
      this.verificationCode?.value !== code ||
      differenceInHours(this.updatedAt.getValue(), new Date()) > 1
    )
      throw new AuthorizationError('Invalid code');
    this.verificationCode = null;
  }

  sendWelcomeEmail(): EmailData {
    const emailData = this.email.sendWelcomeEmail(this.name.fullName());
    this.record(NotificationSent.Email(this.id.value, emailData.title, emailData.body, emailData.data));
    return emailData;
  }

  sendVerificationCodeEmail(): EmailData {
    const emailData = this.email.sendVerificationCodeEmail(this.verificationCode.value, this.name.fullName());
    this.record(NotificationSent.Email(this.id.value, emailData.title, emailData.body, emailData.data));
    return emailData;
  }
}
