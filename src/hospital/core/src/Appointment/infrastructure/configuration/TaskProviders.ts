import { EventBus, TaskBus } from '@ducen/shared';
import { Provider } from '@nestjs/common';
import { MissAppointmentEachTenMinutes } from '../../application/MissAppointment/MissAppointmentEachTenMinutes';
import { AppointmentRepository } from '../../domain/AppointmentRepository';

export const taskHandlers: Provider[] = [
  {
    provide: MissAppointmentEachTenMinutes,
    inject: ['APPOINTMENT_REPOSITORY', 'EVENT_BUS', 'TASK_BUS'],
    useFactory: (repository: AppointmentRepository, eventBus: EventBus, taskBus: TaskBus) =>
      taskBus.addHandler(new MissAppointmentEachTenMinutes(repository, eventBus)),
  },
];
