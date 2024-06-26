import { GraphQLErrorHandling, LoggerMiddleware } from '@ducen/shared';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { DateTimeResolver, VoidResolver } from 'graphql-scalars';
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
import videoConfig from './config/video.config';
import { SharedModule } from './modules/shared/shared.module';
import { UserModule } from './modules/user/user.module';

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
        videoConfig,
      ],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      resolvers: {
        DateTime: DateTimeResolver,
        Void: VoidResolver,
      },
      formatError: GraphQLErrorHandling,
      useGlobalPrefix: true,
      csrfPrevention: false,
      installSubscriptionHandlers: true,
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
    // AppointmentModule,
    // NotificationModule,
  ],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
