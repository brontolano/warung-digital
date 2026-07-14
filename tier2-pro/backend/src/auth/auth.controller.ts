import { Controller, Post, Body, HttpCode, HttpStatus, Get, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, RefreshDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register') @ApiOperation({ summary: 'Register akun baru' })
  async register(@Body() dto: RegisterDto) { return this.authService.register(dto); }

  @Post('login') @HttpCode(HttpStatus.OK) @ApiOperation({ summary: 'Login' })
  async login(@Body() dto: LoginDto) { return this.authService.login(dto); }

  @Post('refresh') @HttpCode(HttpStatus.OK) @ApiOperation({ summary: 'Refresh token' })
  async refresh(@Body() dto: RefreshDto) { return this.authService.refresh(dto.refresh_token); }

  @Get('me') @UseGuards(JwtAuthGuard) @ApiOperation({ summary: 'Profil saat ini' })
  async me(@Request() req: any) { return req.user; }
}
