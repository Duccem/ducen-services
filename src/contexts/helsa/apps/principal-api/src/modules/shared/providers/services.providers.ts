import { Provider } from '@nestjs/common';
import {
  CloudinaryUploader,
  ConsoleLogger,
  FirebaseSender,
  MailSender,
  RedisCacheStore,
} from '@shared/adapters-server';

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
    inject: [],
    useFactory: () => new ConsoleLogger({}),
  },
  {
    provide: 'CACHE_STORE',
    inject: ['CACHE_CONNECTION'],
    useFactory: (connection: any) => new RedisCacheStore(connection),
  },
];
