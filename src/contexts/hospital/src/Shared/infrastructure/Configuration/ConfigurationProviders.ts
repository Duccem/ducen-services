import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const configurations: Provider[] = [
  {
    provide: 'SERVER_CONFIGURATION',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({ ...configService.get('server') }),
  },
  {
    provide: 'CONNECTION_CONFIGURATION',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({ ...configService.get('connections') }),
  },
  {
    provide: 'OAUTH2_CONFIGURATION',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({ ...configService.get('oauth') }),
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
    provide: 'TELEMETRY_CONFIGURATION',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({ ...configService.get('telemetry') }),
  },
  {
    provide: 'STORAGE_CONFIGURATION',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({ ...configService.get('storage') }),
  },
  {
    provide: 'LLM_CONFIGURATION',
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({ ...configService.get('llm') }),
  },
];
