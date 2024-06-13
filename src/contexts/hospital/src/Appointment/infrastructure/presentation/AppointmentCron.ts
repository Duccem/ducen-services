import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MissAppointmentTask } from '../../application/MissAppointment/MissAppointmentTask';

@Injectable()
export class AppointmentCron {
  constructor(@Inject('TASK_BUS') private taskBus: any) {}

  @Cron(MissAppointmentTask.TASK_TIME)
  async missAppointment(): Promise<void> {
    const task = new MissAppointmentTask();
    await this.taskBus.run(task);
  }
}
