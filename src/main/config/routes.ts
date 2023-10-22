import type { Express } from 'express';
import v1 from '@/main/routes/v1';

export default (app: Express): void => {
  app.use('/api/v1', v1());
};
