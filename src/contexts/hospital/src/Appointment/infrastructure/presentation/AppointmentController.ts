import { CommandBus, QueryBus } from '@ducen-services/shared';
import { Controller, Get, Inject } from '@nestjs/common';

@Controller('appointment')
export class AppointmentController {
  constructor(
    @Inject('QUERY_BUS') private queryBus: QueryBus,
    @Inject('COMMAND_BUS') private commandBus: CommandBus,
  ) {}
  @Get()
  async login() {
    return {
      message: 'Hello World',
    };
  }
}
