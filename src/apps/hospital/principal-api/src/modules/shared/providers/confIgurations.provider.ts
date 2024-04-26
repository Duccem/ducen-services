import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import authConfig from '../../../config/auth.config';
import cacheConfig from '../../../config/cache.config';
import dbConfig from '../../../config/db.config';
import emailConfig from '../../../config/email.config';
import imageConfig from '../../../config/image.config';
import notificationConfig from '../../../config/notification.config';
import oauthConfig from '../../../config/oauth.config';
import paymentConfig from '../../../config/payment.config';
import queueConfig from '../../../config/queue.config';
import serverConfig from '../../../config/server.config';

export const confFiles = [
  authConfig,
  cacheConfig,
  dbConfig,
  emailConfig,
  imageConfig,
  notificationConfig,
  oauthConfig,
  paymentConfig,
  queueConfig,
  serverConfig,
];

export const configurations: Provider[] = [
  {
    provide: 'SERVER_CONFIGURATION',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({ ...configService.get('server') }),
  },
  {
    provide: 'DATABASE_CONFIGURATION',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({ ...configService.get('database') }),
  },
  {
    provide: 'QUEUE_CONFIGURATION',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({ ...configService.get('queue') }),
  },
  {
    provide: 'CACHE_CONFIGURATION',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({ ...configService.get('cache') }),
  },
  {
    provide: 'AUTH_CONFIGURATION',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({ ...configService.get('auth') }),
  },
  {
    provide: 'OAUTH2_CONFIGURATION',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({ ...configService.get('oauth') }),
  },
  {
    provide: 'IMAGE_CONFIGURATION',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({ ...configService.get('image') }),
  },
  {
    provide: 'EMAIL_CONFIGURATION',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({ ...configService.get('email') }),
  },
  {
    provide: 'PAYMENT_CONFIGURATION',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({ ...configService.get('payment') }),
  },
  {
    provide: 'NOTIFICATION_CONFIGURATION',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({ ...configService.get('notification') }),
  },
  {
    provide: 'LOGGING_CONFIGURATION',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({ ...configService.get('logging') }),
  },
];
