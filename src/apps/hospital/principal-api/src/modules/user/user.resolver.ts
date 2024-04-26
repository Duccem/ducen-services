import { ChangePasswordCommand, LoginQuery, RecoveryPasswordCommand, UserRegisterCommand } from '@ducen-services/hospital';
import { CommandBus, QueryBus } from '@ducen-services/shared';
import { Inject, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLUpload, Upload } from 'graphql-upload-ts';
import { CloudinaryUploader } from 'src/modules/shared/services/CloudinaryUploader';
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
    const buffer = (await new Promise((resolve) => {
      const buffers: Buffer[] = [];
      stream.on('data', (chunk) => {
        if (typeof chunk === 'string') {
          buffers.push(Buffer.from(chunk, 'utf-8'));
        } else if (chunk instanceof Buffer) {
          buffers.push(chunk);
        } else {
          const jsonData = JSON.stringify(chunk);
          buffers.push(Buffer.from(jsonData, 'utf-8'));
        }
      });
      stream.on('end', () => resolve(Buffer.concat(buffers)));
    })) as Buffer;
    const response = await this.uploader.upload(buffer, image.file.filename);
    return response;
  }
}
