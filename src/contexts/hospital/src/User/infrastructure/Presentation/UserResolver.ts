import { CommandBus, File, QueryBus } from '@ducen-services/shared';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLUpload, Upload } from 'graphql-upload-ts';
import { GenerateUserHabitsQuery } from '../../application/GenerateUserHabits/GenerateUserHabitsQuery';
import { LoginQuery } from '../../application/Login/LoginQuery';
import { UserRegisterCommand } from '../../application/RegisterUser/UserRegisterCommand';
import { UploadProfileImageCommand } from '../../application/UploadProfileImage/UploadProfileImageCommand';
import { User } from '../../domain/User';
import { CurrentUser } from '../Auth/CurrentUserDecorator';
import { JwtAuthGuard } from '../Auth/JWTGuard';
@Resolver('User')
export class UserResolver {
  constructor(
    @Inject('QUERY_BUS') private queryBus: QueryBus,
    @Inject('COMMAND_BUS') private commandBus: CommandBus,
  ) {}

  @Query('login')
  async login(@Args('identifier') identifier: string, @Args('password') password: string) {
    const query = new LoginQuery(identifier, password);
    return await this.queryBus.ask(query);
  }

  @Query('habits')
  async habits(@Args('userId') userId: string) {
    const query = new GenerateUserHabitsQuery(userId, {
      height: 1.7,
      weight: 70,
      age: 25,
    });
    return await this.queryBus.ask(query);
  }

  @Mutation('userRegister')
  async userRegister(@Args('user') user: any) {
    const command = new UserRegisterCommand(user);
    await this.commandBus.dispatch(command);
    return null;
  }

  // @Mutation('recoveryPassword')
  // async recoveryPassword(@Args('email') email: string) {
  //   const command = new RecoveryPasswordCommand(email);
  //   await this.commandBus.dispatch(command);
  //   return null;
  // }

  // @Mutation('changePassword')
  // async changePassword(
  //   @Args('memberId') memberId: string,
  //   @Args('newPassword') newPassword: string,
  //   @Args('oldPassword') oldPassword: string,
  // ) {
  //   const command = new ChangePasswordCommand(memberId, newPassword, oldPassword);
  //   await this.commandBus.dispatch(command);
  //   return null;
  // }

  @Mutation('uploadProfileImage')
  @UseGuards(JwtAuthGuard)
  async uploadImage(
    @Args({ name: 'file', type: () => GraphQLUpload }) image: Upload,
    @Args('name') fileName: string,
    @Args('type') type: string,
    @CurrentUser() user: User,
  ) {
    const stream = image.file.createReadStream();
    const buffer = await File.toBuffer(stream);
    const command = new UploadProfileImageCommand(buffer, user, { fileName, type });
    const response = await this.commandBus.dispatch(command);
    return response;
  }
}
