import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // Kullanıcıyı doğrulama (login işlemi)
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // JWT oluşturma
  async login(user: User) {
    const payload = { username: user.username, sub: user.id,role: user.role  };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Yeni kullanıcı kaydı
  async register(username: string, password: string): Promise<User> {
    return this.userService.createUser(username, password);
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userService.findByUsername(username);
  }
}
