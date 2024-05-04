import {
  ChangePasswordCommand,
  LoginQuery,
  RecoveryPasswordCommand,
  UserRegisterCommand,
} from '@ducen-services/hospital';
import { CommandBus, File, QueryBus } from '@ducen-services/shared';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLUpload, Upload } from 'graphql-upload-ts';
import { JwtAuthGuard } from '../../utils/Guards/JWTGuard';

@Resolver('User')
export class UserResolver {
  constructor(
    @Inject('QUERY_BUS') private queryBus: QueryBus,
    @Inject('COMMAND_BUS') private commandBus: CommandBus,
    @Inject('UPLOADER_SERVICE') private uploader: CloudinaryUploader,
  ) {}

  @Mutation('userRegister')
  async userRegister(@Args('user') user: any) {
    const command = new UserRegisterCommand(user);
    await this.commandBus.dispatch(command);
    return null;
  }

  @Query('login')
  async login(@Args('identifier') identifier: string, @Args('password') password: string) {
    const query = new LoginQuery(identifier, password);
    return await this.queryBus.ask(query);
  }

  @Mutation('recoveryPassword')
  @UseGuards(JwtAuthGuard)
  async recoveryPassword(@Args('email') email: string) {
    const command = new RecoveryPasswordCommand(email);
    await this.commandBus.dispatch(command);
    return null;
  }

  @Mutation('changePassword')
  async changePassword(
    @Args('memberId') memberId: string,
    @Args('newPassword') newPassword: string,
    @Args('oldPassword') oldPassword: string,
  ) {
    const command = new ChangePasswordCommand(memberId, newPassword, oldPassword);
    await this.commandBus.dispatch(command);
    return null;
  }

  @Mutation('uploadImage')
  async uploadImage(@Args({ name: 'file', type: () => GraphQLUpload }) image: Upload) {
    const stream = image.file.createReadStream();
    const buffer = await File.toBuffer(stream);
    const response = await this.uploader.upload(buffer, image.file.filename);
    return response;
  }
}
