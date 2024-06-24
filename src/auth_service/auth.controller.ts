import { Controller, Get, Post, Body, Query, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../models/User';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly jwtService: JwtService) {}

  // Verificação de token
  @Get('token')
  async checkToken(@Query('user') userId: string, @Headers('Authorization') token: string) {
    if (!token) {
      return { auth: false };
    }

    const user = await this.authService.getUserById(userId);
    const decodedToken = this.jwtService.verify(token);

    if (decodedToken.userId === user.id && decodedToken.password === user.password) {
      return { auth: true };
    }

    return { auth: false };
  }

  // Geração de token
  @Post('token')
  async getToken(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      return { token: false };
    }
    const token = this.jwtService.sign({ email: user.email, password: user.password });
    return { token };
  }
}
