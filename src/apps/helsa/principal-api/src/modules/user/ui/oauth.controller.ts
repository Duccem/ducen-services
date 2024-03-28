//import { ExternalSignQuery } from '@ducen/hospital';
import { UserRegisterCommand } from '@helsa/modules';
import { Controller, Get, HttpStatus, Inject, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { QueryBus } from '@shared/core';
import { ResponseModeler } from 'src/utils/Responses/ResponseInterceptor';

@Controller('oauth')
@UseInterceptors(ResponseModeler)
export class OAuthController {
  constructor(@Inject('QUERY_BUS') private queryBus: QueryBus) {}

  @Get('/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/facebook/redirect')
  @UseGuards(AuthGuard('facebook'))
  async facebookLoginRedirect(@Req() req: any): Promise<any> {
    const query = new UserRegisterCommand(req.user.user);
    await this.queryBus.ask(query);
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleLoginRedirect(@Req() req: any): Promise<any> {
    const query = new UserRegisterCommand(req.user.user);
    return await this.queryBus.ask(query);
  }

  @Get('/linkedin')
  @UseGuards(AuthGuard('linkedin'))
  async linkedinLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get('/linkedin/redirect')
  @UseGuards(AuthGuard('linkedin'))
  async linkedinLoginRedirect(@Req() req: any): Promise<any> {
    const query = new UserRegisterCommand(req.user.user);
    return await this.queryBus.ask(query);
  }
}
