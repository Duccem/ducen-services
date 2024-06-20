import { Field, Float, InputType } from '@nestjs/graphql';
import { DateTimeResolver } from 'graphql-scalars';

@InputType('AddressPointRegister')
export class AddressPointInput {
  @Field(() => Float)
  public latitude: number;

  @Field(() => Float)
  public longitude: number;
}

@InputType('UserAddressRegister')
export class UserAddressInput {
  @Field(() => AddressPointInput)
  public coordinates: AddressPointInput;

  @Field()
  public street: string;

  @Field()
  public city: string;

  @Field()
  public country: string;

  @Field()
  public zipCode: string;
}

@InputType('UserConfigurationRegister')
export class UserConfigurationInput {
  @Field()
  public language: string;

  @Field()
  public timeZone: string;

  @Field()
  public currency: string;
}

@InputType('UserNameRegister')
export class UserNameInput {
  @Field()
  public firstName: string;

  @Field()
  public lastName: string;
}

@InputType('UserRegister')
export class UserInput {
  @Field()
  public id: string;

  @Field()
  public name: UserNameInput;

  @Field()
  public email: string;

  @Field()
  public password: string;

  @Field()
  public phoneNumber: string;

  @Field()
  public gender: string;

  @Field()
  public photo: string;

  @Field()
  public role: string;

  @Field((type) => DateTimeResolver)
  public birthDate: Date;

  @Field()
  public address: UserAddressInput;

  @Field()
  public configuration: UserConfigurationInput;
}
