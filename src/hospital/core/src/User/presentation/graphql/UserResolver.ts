import { CommandBus, File, QueryBus } from '@ducen/shared';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { VoidResolver } from 'graphql-scalars';
import { GraphQLUpload, Upload } from 'graphql-upload-ts';
import { ChangePasswordCommand } from '../../application/ChangePassword/ChangePasswordCommand';
import { LoginQuery } from '../../application/Login/LoginQuery';
import { RecoveryPasswordCommand } from '../../application/RecoveryPassword/RecoveryPasswordCommand';
import { UserRegisterCommand } from '../../application/RegisterUser/UserRegisterCommand';
import { UploadProfileImageCommand } from '../../application/UploadProfileImage/UploadProfileImageCommand';
import { User } from '../../domain/User';
import { JwtAuthGuard } from '../helpers/guards/JWTGuard';
import { CurrentUser } from '../helpers/mappers/AuthDecorators';
import { UserInput } from './UserInput';
import { LoginUserType, UserType } from './UserType';

@Resolver((of) => UserType)
export class UserResolver {
  constructor(
    @Inject('QUERY_BUS') private queryBus: QueryBus,
    @Inject('COMMAND_BUS') private commandBus: CommandBus,
  ) {}

  @Query((returns) => LoginUserType, { name: 'login' })
  async login(
    @Args('identifier') identifier: string,
    @Args('password') password: string,
  ): Promise<LoginUserType> {
    const query = new LoginQuery(identifier, password);
    return await this.queryBus.ask(query);
  }

  @Mutation((returns) => VoidResolver, { name: 'userRegister' })
  async userRegister(@Args('user') user: UserInput): Promise<void> {
    const command = new UserRegisterCommand(user as any);
    await this.commandBus.dispatch(command);
    return null;
  }

  @Mutation((returns) => VoidResolver, { name: 'recoveryPassword' })
  async recoveryPassword(@Args('email') email: string): Promise<void> {
    const command = new RecoveryPasswordCommand(email);
    await this.commandBus.dispatch(command);
    return null;
  }

  @Mutation((returns) => VoidResolver, { name: 'changePassword' })
  async changePassword(
    @Args('memberId') memberId: string,
    @Args('newPassword') newPassword: string,
    @Args('oldPassword') oldPassword: string,
  ): Promise<void> {
    const command = new ChangePasswordCommand(memberId, newPassword, oldPassword);
    await this.commandBus.dispatch(command);
    return null;
  }

  @Mutation((returns) => VoidResolver, { name: 'uploadProfilePicture' })
  @UseGuards(JwtAuthGuard)
  async uploadImage(
    @Args({ name: 'file', type: () => GraphQLUpload }) image: Upload,
    @Args('name') fileName: string,
    @Args('type') type: string,
    @CurrentUser() user: User,
  ): Promise<void> {
    const stream = image.file.createReadStream();
    const buffer = await File.toBuffer(stream);
    const command = new UploadProfileImageCommand(buffer, user, { fileName, type });
    const response = await this.commandBus.dispatch(command);
    return response;
  }
}
