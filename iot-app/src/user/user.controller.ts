import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { UserRole } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 🔹 Kullanıcı Kendi Profili
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // Token'dan gelen kullanıcı bilgilerini döner
  }

  // 🔹 Sadece SYSTEM_ADMIN kullanıcıları yeni kullanıcı ekleyebilir
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SYSTEM_ADMIN)
  @Post('create')
  async createUser(
    @Body() createUserDto: { username: string; password: string; role: UserRole },
  ): Promise<User> {
    return await this.userService.createUser(createUserDto.username, createUserDto.password, createUserDto.role);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.COMPANY_ADMIN)
  @Get('company-users')
  async getCompanyUsers(): Promise<User[]> {
    return await this.userService.getAllUsers(); 
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all')
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }

  @Post('register-admin')
  async registerAdmin(
    @Body() createUserDto: { username: string; password: string },
  ): Promise<User> {
    return await this.userService.createUser(createUserDto.username, createUserDto.password, UserRole.SYSTEM_ADMIN);
  }
}
