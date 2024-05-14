import { LokiLogger, S3StoreService } from '@ducen-services/shared';
import { Provider } from '@nestjs/common';

export const services: Provider[] = [
  {
    provide: 'LOGGER_SERVICE',
    inject: ['TELEMETRY_CONFIGURATION'],
    useFactory: ({ logs }: any) => new LokiLogger(logs),
  },
  {
    provide: 'STORE_SERVICE',
    inject: ['STORAGE_CONFIGURATION'],
    useFactory: (storeConfig: any) => new S3StoreService(storeConfig.S3),
  },
];
