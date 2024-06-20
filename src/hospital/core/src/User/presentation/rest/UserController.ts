import { CommandBus, QueryBus } from '@ducen/shared';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { LoginQuery } from '../../application/Login/LoginQuery';
import { LoginDTO } from './dtos/LoginDTO';

@Controller('user')
export class UserController {
  constructor(
    @Inject('QUERY_BUS') private queryBus: QueryBus,
    @Inject('COMMAND_BUS') private commandBus: CommandBus,
  ) {}
  @Post()
  async login(@Body() { email, password }: LoginDTO) {
    const query = new LoginQuery(email, password);
    return await this.queryBus.ask(query);
  }
}
