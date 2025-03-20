// src/protected/protected.controller.ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator'; // Rol kontrolü için dekoratör
import { RolesGuard } from '../auth/roles.guard'; // Guard, rol kontrolü
import { UserRole } from '../user/user.entity'; // Kullanıcı rolleri

@Controller('protected')
export class ProtectedController {
  @Get()
  @Roles(UserRole.SYSTEM_ADMIN, UserRole.COMPANY_ADMIN) // Belirli roller için erişim
  @UseGuards(RolesGuard) // Rol kontrolü
  getProtectedData() {
    return { message: 'This is a protected route' };
  }
}
