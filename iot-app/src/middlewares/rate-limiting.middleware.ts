import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as rateLimit from 'express-rate-limit';

@Injectable()
export class RateLimitingMiddleware implements NestMiddleware {
  private limiter = rateLimit.default({ 
    windowMs: 15 * 60 * 1000, // 15 dakika
    max: 100, // 15 dakika içinde en fazla 100 istek
    message: 'Too many requests from this IP, please try again later',
  });

  use(req: Request, res: Response, next: NextFunction) {
    this.limiter(req, res, next);
  }
}
