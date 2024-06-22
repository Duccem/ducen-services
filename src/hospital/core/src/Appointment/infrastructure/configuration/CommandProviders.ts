import { Provider } from '@nestjs/common';
import { CancelAppointmentCommandHandler } from '../../application/CancelAppointment/CancelAppointmentCommandHandler';
import { ConfirmAppointmentCommandHandler } from '../../application/ConfirmAppointment/ConfirmAppointmentCommandHandler';
import { FinishAppointmentCommandHandler } from '../../application/FinishAppointment/FinishAppointmentCommandHandler';
import { RescheduleAppointmentCommandHandler } from '../../application/RescheduleAppointment/RescheduleAppointmentCommandHandler';
import { ScheduleAppointmentCommandHandler } from '../../application/ScheduleAppointment/ScheduleAppointmentCommandHandler';
import { StartAppointmentCommandHandler } from '../../application/StartAppointment/StartAppointmentCommandHandler';
import { UserEnterAppointmentCommandHandler } from '../../application/UserEnterAppointment/UserEnterAppointmentCommandHandler';

export const commandHandlers: Provider[] = [
  {
    provide: CancelAppointmentCommandHandler,
    inject: ['APPOINTMENT_REPOSITORY', 'INTERNAL_EVENT_BUS', 'COMMAND_BUS'],
    useFactory: (repository, eventBus, commandBus) =>
      commandBus.addHandler(new CancelAppointmentCommandHandler(repository, eventBus)),
  },
  {
    provide: ConfirmAppointmentCommandHandler,
    inject: ['APPOINTMENT_REPOSITORY', 'INTERNAL_EVENT_BUS', 'COMMAND_BUS'],
    useFactory: (repository, eventBus, commandBus) =>
      commandBus.addHandler(new ConfirmAppointmentCommandHandler(repository, eventBus)),
  },
  {
    provide: FinishAppointmentCommandHandler,
    inject: ['APPOINTMENT_REPOSITORY', 'INTERNAL_EVENT_BUS', 'COMMAND_BUS'],
    useFactory: (repository, eventBus, commandBus) =>
      commandBus.addHandler(new FinishAppointmentCommandHandler(repository, eventBus)),
  },
  {
    provide: RescheduleAppointmentCommandHandler,
    inject: ['APPOINTMENT_REPOSITORY', 'INTERNAL_EVENT_BUS', 'COMMAND_BUS'],
    useFactory: (repository, eventBus, commandBus) =>
      commandBus.addHandler(new RescheduleAppointmentCommandHandler(repository, eventBus)),
  },
  {
    provide: ScheduleAppointmentCommandHandler,
    inject: [
      'APPOINTMENT_REPOSITORY',
      'INTERNAL_EVENT_BUS',
      'ROOM_CALL_SERVICE',
      'APPOINTMENT_PATIENT_REPOSITORY',
      'APPOINTMENT_DOCTOR_REPOSITORY',
      'SERVER_CONFIGURATION',
      'COMMAND_BUS',
    ],
    useFactory: (
      repository,
      eventBus,
      roomCallService,
      patientRepository,
      doctorRepository,
      conf,
      commandBus,
    ) =>
      commandBus.addHandler(
        new ScheduleAppointmentCommandHandler(
          repository,
          eventBus,
          roomCallService,
          patientRepository,
          doctorRepository,
          conf.frontendUrl,
        ),
      ),
  },
  {
    provide: StartAppointmentCommandHandler,
    inject: ['APPOINTMENT_REPOSITORY', 'INTERNAL_EVENT_BUS', 'COMMAND_BUS'],
    useFactory: (repository, eventBus, commandBus) =>
      commandBus.addHandler(new StartAppointmentCommandHandler(repository, eventBus)),
  },
  {
    provide: UserEnterAppointmentCommandHandler,
    inject: ['APPOINTMENT_REPOSITORY', 'INTERNAL_EVENT_BUS', 'COMMAND_BUS'],
    useFactory: (repository, eventBus, commandBus) =>
      commandBus.addHandler(new UserEnterAppointmentCommandHandler(repository, eventBus)),
  },
];
