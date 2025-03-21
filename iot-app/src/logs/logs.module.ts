import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './log.entity';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { AuthModule } from '../auth/auth.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Log]),
    AuthModule, 
  ],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
