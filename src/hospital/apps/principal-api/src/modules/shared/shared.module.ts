import { Module } from '@nestjs/common';
import { busesProvider } from './BusesProviders';
import { configurations } from './ConfigurationProviders';
import { connections } from './ConnectionProviders';
import { services } from './ServiceProviders';

@Module({
  controllers: [],
  providers: [...configurations, ...connections, ...services, ...busesProvider],
  exports: [...configurations, ...connections, ...services, ...busesProvider],
})
export class SharedModule {}
