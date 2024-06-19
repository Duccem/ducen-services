import { registerAs } from '@nestjs/config';

export default registerAs('telemetry', () => {
  return {
    logs: {
      host: process.env.LOKI_URL,
      environment: process.env.NODE_ENV,
      path: process.env.LOGS_PATH,
      serviceName: process.env.SERVICE,
    },
    traces: {
      host: process.env.OPENTELEMETRY_EXPORTER_URL,
      serviceName: process.env.SERVICE,
    },
    metrics: {
      host: process.env.PROMETHEUS_EXPORTER_URL,
      serviceName: process.env.SERVICE,
    },
  };
});
