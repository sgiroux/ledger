import { Controller, Post, UseGuards, Req, Get, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { APIRequest } from '../types';
import { User } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { AccessDTO } from './dto/access.dto';
import { LoginRequestDTO } from './dto/login-request.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: 200, type: AccessDTO })
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
  @ApiResponse({ status: 200, type: User })
  @Get('me')
  async me(@Req() req: APIRequest) {
    return await req.user;
  }
}
