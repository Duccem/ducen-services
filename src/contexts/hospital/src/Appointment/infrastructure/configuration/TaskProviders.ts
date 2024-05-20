import { MissAppointmentEachTenMinutes } from '@/Appointment/application/MissAppointment/MissAppointmentEachTenMinutes';
import { EventBus, TaskBus } from '@ducen-services/shared';
import { Provider } from '@nestjs/common';
import { AppointmentRepository } from '../../domain/AppointmentRepository';

export const taskHandlers: Provider[] = [
  {
    provide: MissAppointmentEachTenMinutes,
    inject: ['USER_REPOSITORY', 'EVENT_BUS', 'TASK_BUS'],
    useFactory: (repository: AppointmentRepository, eventBus: EventBus, taskBus: TaskBus) =>
      taskBus.addHandler(new MissAppointmentEachTenMinutes(repository, eventBus)),
  },
];
