import { Field, Float, ObjectType } from '@nestjs/graphql';
import { DateTimeResolver } from 'graphql-scalars';

@ObjectType('AddressPoint')
export class AddressPointType {
  @Field(() => Float)
  public latitude: number;

  @Field(() => Float)
  public longitude: number;
}

@ObjectType('UserAddress')
export class UserAddressType {
  @Field(() => AddressPointType)
  public coordinates: AddressPointType;

  @Field()
  public street: string;

  @Field()
  public city: string;

  @Field()
  public country: string;

  @Field()
  public zipCode: string;
}

@ObjectType('UserConfiguration')
export class UserConfigurationType {
  @Field()
  public language: string;

  @Field()
  public timeZone: string;

  @Field()
  public currency: string;
}

@ObjectType('UserName')
export class UserNameType {
  @Field()
  public firstName: string;

  @Field()
  public lastName: string;
}

@ObjectType('User')
export class UserType {
  @Field()
  public id: string;

  @Field((type) => DateTimeResolver)
  public createdAt: Date;

  @Field((type) => DateTimeResolver)
  public updatedAt: Date;

  @Field(() => UserNameType)
  public name: UserNameType;

  @Field()
  public email: string;

  @Field()
  public phoneNumber: string;

  @Field((type) => DateTimeResolver)
  public birthDate: Date;

  @Field()
  public photo: string;

  @Field(() => UserAddressType)
  public address: UserAddressType;

  @Field(() => UserConfigurationType)
  public configuration: UserConfigurationType;
}

@ObjectType('LoginUser')
export class LoginUserType {
  @Field()
  public token: string;

  @Field(() => UserType)
  public user: UserType;
}
