import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { busesProvider } from './providers/buses.provider';
import { configurations } from './providers/confIgurations.provider';
import { connections } from './providers/connections.provider';
import { eventHandlers, EventSubscribers } from './providers/eventHandlers';
import { services } from './providers/services.providers';

@Module({
  controllers: [HealthController],
  providers: [...configurations, ...connections, ...services, ...eventHandlers, EventSubscribers, ...busesProvider],
  exports: [...configurations, ...connections, ...services, ...eventHandlers, EventSubscribers, ...busesProvider],
})
export class SharedModule {}
