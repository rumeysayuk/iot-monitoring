// src/log/log.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction } from 'express';
import { LogService } from './log.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  constructor(
    private readonly logService: LogService,
    private readonly userService: UserService, // UserService inject ediliyor
  ) {}

  async use(req: Request & { user?: { id?: string } }, _: Response, next: NextFunction) {
    const userId = Number(req.user?.id); // JWT ile alınan kullanıcı ID'si
    if (userId) {
      const user = await this.userService.findOne(userId); // findOne metodu ile kullanıcıyı buluyoruz

      // Eğer kullanıcı bulunursa log kaydını oluşturuyoruz
      if (user) {
        await this.logService.createLog(user, 'viewed_logs', {
          timestamp: Math.floor(Date.now() / 1000),
        });
      }
    }
    next(); // Diğer middleware'lere geçiş
  }
}
