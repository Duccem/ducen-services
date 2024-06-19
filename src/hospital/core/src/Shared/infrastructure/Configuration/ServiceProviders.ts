import { LokiLogger } from '@ducen/shared';
import { Provider } from '@nestjs/common';
import { S3StoreService } from '../../../MedicalDocument/infrastructure/services/S3StoreService';

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
