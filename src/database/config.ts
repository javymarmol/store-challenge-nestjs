import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('config', () => {
  return {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  };
});
