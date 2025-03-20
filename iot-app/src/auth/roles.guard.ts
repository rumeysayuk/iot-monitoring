import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UserRole } from '../user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Controller veya method üzerindeki @Roles() dekoratöründen rolleri al
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    if (!requiredRoles) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    console.log('🟡 RolesGuard - Context Type:', context.getType());
    console.log('🟡 RolesGuard - Request User:', user);
    console.log('🟡 RolesGuard - Required Roles:', requiredRoles);
    
    if (!user) {
      console.log('❌ RolesGuard - Kullanıcı bulunamadı!');
      return false;
    }

    const hasRole = requiredRoles.some((role) => user.role === role);
    console.log('🟡 RolesGuard - Has Role:', hasRole, 'User Role:', user.role);
    
    return hasRole;
  }
}