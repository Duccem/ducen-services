import { Module } from '@nestjs/common';
import { HealthController } from '../Presentation/HealthController';
import { busesProvider } from './BusesProviders';
import { configurations } from './ConfigurationProviders';
import { connections } from './ConnectionProviders';
import { services } from './ServiceProviders';

@Module({
  controllers: [HealthController],
  providers: [...configurations, ...connections, ...services, ...busesProvider],
  exports: [...configurations, ...connections, ...services, ...busesProvider],
})
export class SharedModule {}
