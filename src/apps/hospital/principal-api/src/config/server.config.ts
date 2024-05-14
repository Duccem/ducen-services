import { registerAs } from '@nestjs/config';

export default registerAs('server', () => {
  return {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'http://localhost',
    service: process.env.SERVICE || 'hospital',
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:4200',
    globalPrefix: process.env.GLOBAL_PREFIX || 'api',
    traceUrl: process.env.TRACE_URL || 'http://localhost:4318/v1/traces',
    authKey: process.env.AUTH_KEY || 'auth-key',
  };
});
