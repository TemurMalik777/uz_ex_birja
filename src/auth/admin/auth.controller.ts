import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AdminAuthService } from './auth.service';
import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { SignInDto } from '../dto/sing-in.dto';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthAdminController {
  constructor(private readonly authService: AdminAuthService) {}

  @Post('admin-sign-up')
  async signUp(@Body() createAdminDto: CreateAdminDto) {
    return this.authService.signUpAdmin(createAdminDto);
  }

  @Post('admin-sign-in')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signInAdmin(signInDto, res);
  }

  @Post('admin-sign-out')
  async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signOutAdmin(req, res);
  }

  @Post('admin-refresh')
  async refreshToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const adminId = req.body.adminId;
    const refresh_token = req.body.refresh_token;
    return this.authService.refreshToken(adminId, refresh_token, res);
  }
}
