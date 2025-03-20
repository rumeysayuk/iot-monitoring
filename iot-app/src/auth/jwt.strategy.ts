import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UserService } from '../user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService, 
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'ggaswpbrorumo', 
    });
  }

  async validate(payload: JwtPayload) {
    console.log('✅ JWT Decode:', payload); 
    const { username } = payload;
    const user = await this.userService.findByUsername(username);
    console.log('✅ User Found:', user);
  
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
  
    return { id: user.id, username: user.username, role: user.role };
  }
}
