import { LoginQuery } from '@helsa/modules';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { QueryBus } from '@shared/core';

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
}
