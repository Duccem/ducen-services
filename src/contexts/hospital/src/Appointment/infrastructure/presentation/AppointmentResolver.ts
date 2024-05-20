import { CommandBus, QueryBus } from '@ducen-services/shared';
import { Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver('Appointment')
export class AppointmentResolver {
  constructor(
    @Inject('QUERY_BUS') private queryBus: QueryBus,
    @Inject('COMMAND_BUS') private commandBus: CommandBus,
  ) {}

  @Query('myAppointments')
  async myAppointments() {
    return [];
  }
}
