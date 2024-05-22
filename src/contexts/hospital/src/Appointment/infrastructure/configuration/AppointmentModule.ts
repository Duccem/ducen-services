import { Module } from '@nestjs/common';
import { SharedModule } from '../../../Shared/infrastructure/Configuration/SharedModule';
import { AppointmentController } from '../presentation/AppointmentController';
import { AppointmentCron } from '../presentation/AppointmentCron';
import { AppointmentResolver } from '../presentation/AppointmentResolver';
import { TwilioRoomCallService } from '../services/TwilioRoomCallService';
import { commandHandlers } from './CommandProviders';
import { queryHandlers } from './QueryProviders';
import { appointmentRepositories } from './RepositoryProviders';
import { taskHandlers } from './TaskProviders';

@Module({
  imports: [SharedModule],
  controllers: [AppointmentController],
  providers: [
    {
      provide: 'ROOM_CALL_SERVICE',
      inject: ['VIDEO_CONFIGURATION'],
      useFactory: (config) => {
        return new TwilioRoomCallService(config.twilio.accountSid, config.twilio.apiKey, config.twilio.apiSecret);
      },
    },
    ...appointmentRepositories,
    ...queryHandlers,
    ...commandHandlers,
    ...taskHandlers,
    AppointmentCron,
    AppointmentResolver,
  ],
  exports: ['APPOINTMENT_REPOSITORY'],
})
export class AppointmentModule {}
