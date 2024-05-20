import { Inject, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppointmentScheduler {
  constructor(@Inject('TASK_BUS') private taskBus: any) {}

  @Cron('0 0 0 * * *')
  async laterVerifier(): Promise<void> {
    await this.taskBus.run('LaterVerifier');
  }
}
