import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { log } from 'console';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
  
    if (!authHeader) {
      console.log('❌ JWT Header Yok');
      return false;
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = this.jwtService.verify(token);
      console.log('✅ JWT Doğrulandı:', decoded);
  
      request.user = {
        id: decoded.sub,
        username: decoded.username,
        role: decoded.role
      };
      
      console.log('🟢 JwtAuthGuard - Request User Ayarlandı:', request.user);
      
      return true;
    } catch (error) {
      console.log('❌ JWT Doğrulama Hatası:', error.message);
      return false;
    }
  }
}