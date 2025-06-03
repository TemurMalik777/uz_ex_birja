import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from '../../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/entities/user.entity';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { SignInDto } from '../dto/sing-in.dto';
import * as bcrypt from 'bcrypt';
import { Response, Request } from 'express';

@Injectable()
export class AuthUserService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async UsergenerateToken(user: User) {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async signUpUser(createUserDto: CreateUserDto) {
    const candidate = await this.userService.findByEmail(createUserDto.email);
    if (candidate) {
      throw new ConflictException('Bunday foydalanuvchi mavjud');
    }
    const newUser = await this.userService.create(createUserDto);
    return { message: "Foydalanuvchi qo'shildi", userId: newUser.id };
  }

  async signInUser(singInDto: SignInDto, res: Response) {
    const user = await this.userService.findByEmail(singInDto.email);
    console.log('email:', singInDto.email);

    if (!user) {
      throw new BadRequestException('Email yoki passwor hato');
    }
    const isValidPassword = await bcrypt.compare(
      singInDto.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new BadRequestException('Email yoki passwor hato p ');
    }
    const tokens = await this.UsergenerateToken(user);
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    try {
      const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
      user.refresh_token = hashed_refresh_token;
      await this.userService.update(user.id, user);
    } catch (error) {
      console.log('Token da xatolik !?!');
    }

    return {
      message: 'Tizimga hush kelibsiz',
      accessToken: tokens.accessToken,
    };
  }

  async signOutUser(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;

    const user = await this.userService.findUserByRefresh(refresh_token);

    if (!user) {
      throw new BadGatewayException("Token yoq yoki noto'g'ri");
    }
    user.refresh_token = '';
    await this.userService.update(user.id, user);

    res.clearCookie('refresh_token');

    return { message: "Siz endi yo'q siz !?" };
  }

  async refreshToken(userId: number, refresh_token: string, res: Response) {
    const decodeToken = await this.jwtService.decode(refresh_token);

    if (userId !== decodeToken['id']) {
      throw new ForbiddenException('Ruxsat etilmagan');
    }
    const user = await this.userService.findOne(userId);

    // console.log('Hashed token:', staff?.hashed_refresh_token);

    if (!user || !user.refresh_token) {
      throw new NotFoundException('user not found');
    }

    const tokenMatch = await bcrypt.compare(refresh_token, user.refresh_token);

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const { accessToken, refreshToken } = await this.UsergenerateToken(user);

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.userService.updateRefreshToken(user.id, hashed_refresh_token);

    res.cookie('refresh_token', refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const respnose = {
      message: 'user refreshed',
      patientId: user.id,
      access_token: accessToken,
    };
    return respnose;
  }
}
