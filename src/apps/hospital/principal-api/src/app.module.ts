import { AppointmentModule, SharedModule, UserModule } from '@ducen-services/hospital';
import { GraphQLErrorHandling, LoggerMiddleware } from '@ducen-services/shared';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { OpenTelemetryModule } from 'nestjs-otel';
import connectionsConfig from './config/connections.config';
import { getEnv } from './config/env.config';
import llmConfig from './config/llm.config';
import notificationConfig from './config/notification.config';
import oauthConfig from './config/oauth.config';
import paymentConfig from './config/payment.config';
import serverConfig from './config/server.config';
import storageConfig from './config/storage.config';
import loggingConfig from './config/telemetry.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: getEnv(),
      load: [
        notificationConfig,
        oauthConfig,
        paymentConfig,
        serverConfig,
        loggingConfig,
        connectionsConfig,
        storageConfig,
        llmConfig,
      ],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      formatError: GraphQLErrorHandling,
      useGlobalPrefix: true,
      csrfPrevention: false,
    }),
    OpenTelemetryModule.forRoot({
      metrics: {
        hostMetrics: true,
        apiMetrics: {
          enable: true,
        },
      },
    }),
    ScheduleModule.forRoot(),
    SharedModule,
    UserModule,
    AppointmentModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
