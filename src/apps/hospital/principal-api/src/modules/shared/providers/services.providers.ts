import { LokiLogger } from '@ducen-services/shared';
import { Provider } from '@nestjs/common';

import { CloudinaryUploader } from '../services/CloudinaryUploader';

export const services: Provider[] = [
  {
    provide: 'UPLOADER_SERVICE',
    inject: ['IMAGE_CONFIGURATION'],
    useFactory: (imageConf: any) => new CloudinaryUploader(imageConf),
  },
  {
    provide: 'LOGGER_SERVICE',
    inject: ['LOGGING_CONFIGURATION'],
    useFactory: ({ serviceName, environment }: any) => {
      const logger = new LokiLogger({ serviceName, environment, host: 'http://localhost:3100' });
      return logger;
    },
  },
];
