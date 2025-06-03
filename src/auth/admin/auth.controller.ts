import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { AdminAuthService } from './auth.service';
import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { SignInDto } from '../dto/sing-in.dto';
import { Request, Response } from 'express';
import { CookieGetter } from '../../common/decorator/cookie-getter.decorator';

// JwtGuard va RefreshTokenGuard bo'lsa import qiling va @UseGuards ichiga yozing

@ApiTags('auth-admin')
@Controller('auth-admin')
export class AuthAdminController {
  constructor(private readonly authService: AdminAuthService) {}

  @Post('sign-up')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Yangi admin ro\'yxatdan o\'tishi' })
  @ApiBody({ type: CreateAdminDto })
  @ApiResponse({ status: 201, description: 'Admin muvaffaqiyatli yaratildi' })
  signUp(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.signUpAdmin(createAdminDto);
  }

  @Post('sign-in')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Admin tizimga kirishi' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: 200, description: 'Tizimga muvaffaqiyatli kirildi' })
  @ApiResponse({ status: 401, description: 'Kirish uchun ruxsat yo‘q' })
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signInAdmin(signInDto, res);
  }

  @HttpCode(200)
  @Post('sign-out')
  @UseGuards() // JwtGuardni shu yerga yozing agar bor bo'lsa
  @ApiOperation({ summary: 'Admin tizimdan chiqishi' })
  @ApiResponse({ status: 200, description: 'Chiqish muvaffaqiyatli amalga oshirildi' })
  @ApiCookieAuth() // Agar JWT cookie bilan bo‘lsa, cookie auth uchun
  async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signOutAdmin(req, res);
  }

  @Post(':id/admin-refresh')
  @UseGuards() // RefreshTokenGuardni shu yerga yozing agar bor bo'lsa
  @ApiOperation({ summary: 'Tokenni yangilash (refresh token)' })
  @ApiParam({ name: 'id', description: 'Admin ID', type: Number })
  @ApiCookieAuth()
  @ApiResponse({ status: 200, description: 'Token yangilandi' })
  @ApiResponse({ status: 401, description: 'Token yangilash uchun ruxsat yo‘q' })
  async refresh(
    @Param('id', ParseIntPipe) id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }
}
