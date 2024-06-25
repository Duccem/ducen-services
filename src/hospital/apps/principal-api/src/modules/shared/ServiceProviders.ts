import { S3StoreService } from '@ducen/hospital';
import { ConsoleWinstonLogger } from '@ducen/shared';
import { Provider } from '@nestjs/common';

export const services: Provider[] = [
  {
    provide: 'LOGGER_SERVICE',
    inject: [],
    useFactory: () => {
      const logger = new ConsoleWinstonLogger({ serviceName: 'ducen-hospital', environment: 'development' });
      return logger;
    },
  },
  {
    provide: 'STORE_SERVICE',
    inject: ['STORAGE_CONFIGURATION'],
    useFactory: (storeConfig: any) => new S3StoreService(storeConfig.S3),
  },
];
