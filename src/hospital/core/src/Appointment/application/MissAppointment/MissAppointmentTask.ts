import { Task } from '@ducen/shared';

export class MissAppointmentTask extends Task {
  static TASK_TIME = '*/10 * * * *';
  constructor() {
    super();
  }
}
