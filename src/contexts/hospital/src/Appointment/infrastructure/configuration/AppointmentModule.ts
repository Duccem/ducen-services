import { Module } from '@nestjs/common';
import { SharedModule } from '../../../Shared/infrastructure/Configuration/SharedModule';
import { AppointmentController } from '../presentation/AppointmentController';
import { AppointmentCron } from '../presentation/AppointmentCron';
import { AppointmentResolver } from '../presentation/AppointmentResolver';
import { commandHandlers } from './CommandProviders';
import { queryHandlers } from './QueryProviders';
import { appointmentRepositories } from './RepositoryProviders';
import { taskHandlers } from './TaskProviders';

@Module({
  imports: [SharedModule],
  controllers: [AppointmentController],
  providers: [
    ...appointmentRepositories,
    ...queryHandlers,
    ...commandHandlers,
    ...taskHandlers,
    AppointmentResolver,
    AppointmentCron,
  ],
  exports: ['APPOINTMENT_REPOSITORY'],
})
export class AppointmentModule {}
