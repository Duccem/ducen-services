import { Logger } from '@ducen/shared';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { graphqlUploadExpress } from 'graphql-upload-ts';
import { AppModule } from './app.module';
import nodeSdk from './tracing';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const logger = app.get<Logger>('LOGGER_SERVICE');
  const configurations = app.get('SERVER_CONFIGURATION');
  const telemetryConf = app.get('TELEMETRY_CONFIGURATION');
  nodeSdk(telemetryConf.traces.serviceName, telemetryConf.traces.host, logger);
  const port = configurations.port || 3000;
  const host = configurations.host || 'http://localhost';
  const globalPrefix = configurations.globalPrefix || 'api';

  app.setGlobalPrefix(globalPrefix);
  app.useLogger(logger);
  app.enableCors();
  app.use('/api/graphql', graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }));
  await app.listen(port || 3000);
  logger.log(`🚀 Application is running on: ${host}:${port}/${globalPrefix}`);
}
bootstrap();
