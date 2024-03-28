import { registerAs } from '@nestjs/config';

export default registerAs('email', () => {
  return {
    username: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASS,
    fromEmail: process.env.EMAIL_FROM,
    templatePath: process.env.EMAIL_TEMPLATE_PATH,
  };
});
