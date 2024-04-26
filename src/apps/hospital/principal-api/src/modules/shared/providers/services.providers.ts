import { ConsoleLogger } from '@ducen-services/shared';
import { Provider } from '@nestjs/common';

import { CloudinaryUploader } from '../services/CloudinaryUploader';
import { FirebaseSender } from '../services/FirebaseSender';
import { MailSender } from '../services/MailSender';

export const services: Provider[] = [
  {
    provide: 'UPLOADER_SERVICE',
    inject: ['IMAGE_CONFIGURATION'],
    useFactory: (imageConf: any) => new CloudinaryUploader(imageConf),
  },
  {
    provide: 'NOTIFICATION_SERVICE',
    inject: ['NOTIFICATION_CONFIGURATION'],
    useFactory: (conf: any) => new FirebaseSender(conf),
  },
  {
    provide: 'EMAIL_SERVICE',
    inject: ['EMAIL_CONFIGURATION'],
    useFactory: (conf: any) => new MailSender(conf.fromEmail, conf.username, conf.password, conf.templatePath),
  },
  {
    provide: 'LOGGER_SERVICE',
    inject: ['LOGGING_CONFIGURATION'],
    useFactory: ({ serviceName, environment }: any) => {
      const logger = new ConsoleLogger({ serviceName, environment });
      return logger;
    },
  },
];
