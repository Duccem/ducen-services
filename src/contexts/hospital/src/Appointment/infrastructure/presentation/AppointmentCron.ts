import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MissAppointmentEachTenMinutes } from '../../application/MissAppointment/MissAppointmentEachTenMinutes';

@Injectable()
export class AppointmentCron {
  constructor(@Inject('TASK_BUS') private taskBus: any) {}

  @Cron(MissAppointmentEachTenMinutes.TIME)
  async missAppointment(): Promise<void> {
    await this.taskBus.run(MissAppointmentEachTenMinutes.NAME);
  }
}
