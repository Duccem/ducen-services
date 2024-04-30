import { LokiLogger } from '@ducen-services/shared';
import { Provider } from '@nestjs/common';

export const services: Provider[] = [
  {
    provide: 'LOGGER_SERVICE',
    inject: ['LOGGING_CONFIGURATION'],
    useFactory: ({ serviceName, environment }: any) => {
      const logger = new LokiLogger({ serviceName, environment, host: 'http://localhost:3100' });
      return logger;
    },
  },
];
