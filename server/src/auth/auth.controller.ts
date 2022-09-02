import { Controller, Post, UseGuards, Req, Get, Body } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { APIRequest } from '../types';
import { AuthService } from './auth.service';
import { LoginRequestDTO } from './dto/login-request.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: APIRequest,
    // Disable the next line to allow swagger to interpret the type correctly
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() loginRequestDTO: LoginRequestDTO,
  ) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('me')
  async me(@Req() req: APIRequest) {
    return req.user;
  }
}
