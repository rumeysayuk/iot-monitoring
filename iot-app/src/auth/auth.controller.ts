import { Controller, Post, Body,UseGuards,Req  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // Kullanıcı kaydı
  @Post('register')
  async register(@Body() createUserDto: { username: string; password: string }): Promise<User> {
    return await this.userService.createUser(createUserDto.username, createUserDto.password);
  }

  // Kullanıcı giriş yapma (JWT token alma)
  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('decode-token')
  @UseGuards(JwtAuthGuard)
  decodeToken(@Req() req) {
    return req.user;
  }
}
