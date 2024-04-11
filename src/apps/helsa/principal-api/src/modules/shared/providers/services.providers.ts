import { ConsoleLogger, format } from '@ducen/server';
import { Provider } from '@nestjs/common';
import winston from 'winston';
import LokiTransport from 'winston-loki';
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
    useFactory: ({ serviceName, environment, host, path }: any) => {
      const logger = new ConsoleLogger({});
      if (host) {
        logger.addTransport(
          new LokiTransport({
            host: host,
            labels: { app: serviceName, env: environment },
          }),
        );
      }
      if (path) {
        const filename = `logs/${serviceName}-${environment}-${new Date().toISOString()}.log`;
        logger.addTransport(new winston.transports.File({ filename, format }));
      }
      return logger;
    },
  },
];
