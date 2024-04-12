import { QueryBus } from '@ducen/core';
import { LoginQuery, UserRegisterCommand } from '@helsa/modules';
import { Body, Controller, Get, HttpStatus, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

class LoginDTO {
  email: string;
  password: string;
}

@Controller('user')
export class UserController {
  constructor(@Inject('QUERY_BUS') private queryBus: QueryBus) {}
  @Post()
  async login(@Body() { email, password }: LoginDTO) {
    const query = new LoginQuery(email, password);
    return await this.queryBus.ask(query);
  }
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
