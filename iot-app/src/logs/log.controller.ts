import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { LogService } from './log.service';
import { UserRole } from '../user/user.entity';

@Controller('logs')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get()
  // @Roles(UserRole.SYSTEM_ADMIN) 
  getAllLogs(@Req() req) {
    console.log('🟢 Kullanıcı:', req.user);
    return this.logService.getAllLogs();
  }
}
