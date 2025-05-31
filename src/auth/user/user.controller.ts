import {
  Body,
  Controller,
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
import { SignInDto } from '../dto/sing-in.dto';
import { Request, Response } from 'express';
import { CookieGetter } from '../../common/decorator/cookie-getter.decorator';
import { AuthUserService } from './user.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';

@ApiTags('auth-user')
@Controller('auth-user')
export class AuthUserController {
  constructor(private readonly authService: AuthUserService) {}

  @Post('sign-up')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Yangi foydalanuvchi ro‘yxatdan o‘tishi' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Foydalanuvchi muvaffaqiyatli yaratildi',
  })
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUpUser(createUserDto);
  }

  @Post('sign-in')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Foydalanuvchi tizimga kirishi' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({ status: 200, description: 'Tizimga muvaffaqiyatli kirildi' })
  @ApiResponse({ status: 401, description: 'Kirish uchun ruxsat yo‘q' })
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signInUser(signInDto, res);
  }

  @Post('sign-out')
  @UseGuards() // JwtGuard bo‘lsa shu yerga qo‘ying
  @ApiOperation({ summary: 'Foydalanuvchi tizimdan chiqishi' })
  @ApiResponse({
    status: 200,
    description: 'Chiqish muvaffaqiyatli amalga oshirildi',
  })
  @ApiCookieAuth()
  async signOut(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signOutUser(req, res);
  }

  @Post(':id/user-refresh')
  @UseGuards() // RefreshTokenGuard bo‘lsa shu yerga qo‘ying
  @ApiOperation({ summary: 'Tokenni yangilash (refresh token)' })
  @ApiParam({ name: 'id', description: 'Foydalanuvchi ID', type: Number })
  @ApiCookieAuth()
  @ApiResponse({ status: 200, description: 'Token yangilandi' })
  @ApiResponse({
    status: 401,
    description: 'Token yangilash uchun ruxsat yo‘q',
  })
  async refresh(
    @Param('id', ParseIntPipe) id: number,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshToken(id, refreshToken, res);
  }
}
