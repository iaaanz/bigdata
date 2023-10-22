import { config } from 'dotenv';

config();

function environment() {
  return {
    ENVIRONMENT: process.env.ENVIRONMENT,
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_DATABASE: process.env.DB_DATABASE,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
  };
}

export default environment();
