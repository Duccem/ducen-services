import { ConsoleWinstonLogger } from '@ducen/shared';
import { Provider } from '@nestjs/common';
import { S3StoreService } from '../../../MedicalDocument/infrastructure/services/S3StoreService';

export const services: Provider[] = [
  {
    provide: 'LOGGER_SERVICE',
    inject: ['TELEMETRY_CONFIGURATION'],
    useFactory: ({ logs }: any) => {
      const logger = new ConsoleWinstonLogger({ serviceName: 'ducen-hospital', environment: 'development' });
      logger.enableFileLogger();
      logger.enableLokiLogger(logs.host);
      return logger;
    },
  },
  {
    provide: 'STORE_SERVICE',
    inject: ['STORAGE_CONFIGURATION'],
    useFactory: (storeConfig: any) => new S3StoreService(storeConfig.S3),
  },
];
