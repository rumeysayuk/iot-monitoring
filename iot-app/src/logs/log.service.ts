import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './log.entity';
import { User } from '../user/user.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  // Log oluşturma metodu
  async createLog(user: User, action: string, details: Record<string, any> | null = null) {
    const log = new Log();
    log.user = user;
    log.timestamp = Math.floor(Date.now() / 1000); // UNIX timestamp
    log.action = action;
    log.details = details;

    return this.logRepository.save(log);
  }

  // Kullanıcı loglarını getirme metodu
  async getLogsByUser(userId: number): Promise<Log[]> {
    return this.logRepository.find({
      where: { user: { id: userId } },
      order: { timestamp: 'DESC' },
    });
  }

  // Tüm logları getirme metodu
  async getAllLogs(): Promise<Log[]> {
    return this.logRepository.find({ order: { timestamp: 'DESC' } });
  }
}
