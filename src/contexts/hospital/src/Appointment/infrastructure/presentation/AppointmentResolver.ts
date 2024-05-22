import { CommandBus, QueryBus } from '@ducen-services/shared';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CancelAppointmentCommand } from '../../application/CancelAppointment/CancelAppointmentCommand';
import { ConfirmAppointmentCommand } from '../../application/ConfirmAppointment/ConfirmAppointmentCommand';
import { FinishAppointmentCommand } from '../../application/FinishAppointment/FinishAppointmentCommand';
import { ListPatientAppointmentsQuery } from '../../application/ListPatientAppointments/ListPatientAppointmentsQuery';
import { RescheduleAppointmentCommand } from '../../application/RescheduleAppointment/RescheduleAppointmentCommand';
import { ScheduleAppointmentCommand } from '../../application/ScheduleAppointment/ScheduleAppointmentCommand';
import { StartAppointmentCommand } from '../../application/StartAppointment/StartAppointmentCommand';
import { UserEnterAppointmentCommand } from '../../application/UserEnterAppointment/UserEnterAppointmentCommand';
import { ScheduleDTO } from './dto/ScheduleDTO';

@Resolver('Appointment')
export class AppointmentResolver {
  constructor(
    @Inject('QUERY_BUS') private queryBus: QueryBus,
    @Inject('COMMAND_BUS') private commandBus: CommandBus,
  ) {}

  @Mutation('scheduleAppointment')
  async scheduleAppointment(@Args('data') data: ScheduleDTO) {
    return this.commandBus.dispatch(new ScheduleAppointmentCommand(data));
  }

  @Mutation('reScheduleAppointment')
  async reScheduleAppointment(
    @Args('appointmentId') appointmentId: string,
    @Args('initDate') initDate: Date,
    @Args('endDate') endDate: Date,
  ) {
    return this.commandBus.dispatch(new RescheduleAppointmentCommand(appointmentId, initDate, endDate));
  }

  @Mutation('confirmAppointment')
  async confirmAppointment(@Args('appointmentId') appointmentId: string) {
    return this.commandBus.dispatch(new ConfirmAppointmentCommand(appointmentId));
  }

  @Mutation('cancelAppointment')
  async cancelAppointment(@Args('appointmentId') appointmentId: string, @Args('reason') reason: string) {
    return this.commandBus.dispatch(new CancelAppointmentCommand(appointmentId, reason));
  }

  @Mutation('userEnterAppointment')
  async userEnterAppointment(@Args('appointmentId') appointmentId: string, @Args('whoEnter') whoEnter: string) {
    return this.commandBus.dispatch(new UserEnterAppointmentCommand(appointmentId, whoEnter as any));
  }
  @Mutation('userLeaveAppointment')
  async userLeaveAppointment(@Args('appointmentId') appointmentId: string, @Args('whoLeave') whoLeaver: string) {
    return this.commandBus.dispatch(new UserEnterAppointmentCommand(appointmentId, whoLeaver as any));
  }

  @Mutation('startAppointment')
  async startAppointment(@Args('appointmentId') appointmentId: string) {
    return this.commandBus.dispatch(new StartAppointmentCommand(appointmentId));
  }
  @Mutation('finishAppointment')
  async finishAppointment(@Args('appointmentId') appointmentId: string) {
    return this.commandBus.dispatch(new FinishAppointmentCommand(appointmentId));
  }

  @Query('getPatientAppointments')
  async getPatientAppointments(
    @Args('patientId') patientId: string,
    @Args('pagination') pagination: { limit: number; offset: number },
  ) {
    console.log(pagination);
    return this.queryBus.ask(new ListPatientAppointmentsQuery(patientId, pagination.limit, pagination.offset));
  }
}
