import { Module } from '@nestjs/common';
import { SharedModule } from '../../../Shared/infrastructure/Configuration/SharedModule';
import { AppointmentController } from '../presentation/AppointmentController';
import { AppointmentResolver } from '../presentation/AppointmentResolver';
import { AppointmentScheduler } from '../presentation/AppointmentScheduler';
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
    AppointmentScheduler,
  ],
  exports: ['APPOINTMENT_REPOSITORY'],
})
export class AppointmentModule {}
