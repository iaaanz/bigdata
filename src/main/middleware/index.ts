import type { Request, Response, NextFunction } from 'express';
import { json } from 'express';

export const contentType = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.type('json');
  next();
};

export const bodyParser = json({ limit: '12mb' });
