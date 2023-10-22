import express from 'express';
import morgan from 'morgan';
import setupMiddleware from '@/main/config/middleware';
import setupRoutest from '@/main/config/routes';

const app = express();

app.use(morgan('dev'));

setupMiddleware(app);
setupRoutest(app);

export default app;
