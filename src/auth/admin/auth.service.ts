import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AdminService } from '../../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '../../admin/entities/admin.entity';
import { CreateAdminDto } from '../../admin/dto/create-admin.dto';
import { SignInDto } from '../dto/sing-in.dto';
import * as bcrypt from 'bcrypt';
import { Response, Request } from 'express';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async AdmingenerateToken(admin: Admin) {
    const payload = {
      id: admin.id,
      role: admin.role,
      is_active: admin.is_active,
      is_creator: admin.is_creator,
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

  async signUpAdmin(createAdminDto: CreateAdminDto) {
    const candidate = await this.adminService.findAdminByEmail(
      createAdminDto.email,
    );
    if (candidate) {
      throw new ConflictException('Bunday foydalanuvchi mavjud');
    }
    const newAdmin = await this.adminService.create(createAdminDto);
    return { message: "Foydalanuvchi qo'shildi", adminId: newAdmin.id };
  }

  async signInAdmin(singInDto: SignInDto, res: Response) {
    const admin = await this.adminService.findAdminByEmail(singInDto.email);

    if (!admin) {
      throw new BadRequestException('Email yoki passwor hato');
    }
    const isValidPassword = await bcrypt.compare(
      singInDto.password,
      admin.hashed_password,
    );

    if (!isValidPassword) {
      throw new BadRequestException('Email yoki passwor hato p ');
    }
    const tokens = await this.AdmingenerateToken(admin);
    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      maxAge: Number(process.env.COOKIE_TIME),
    });

    try {
      const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
      admin.refresh_token = hashed_refresh_token;
      await this.adminService.update(admin.id, admin);
    } catch (error) {
      console.log('Token da xatolik !?!');
    }

    return {
      message: 'Tizimga hush kelibsiz',
      accessToken: tokens.accessToken,
    };
  }

  async signOutAdmin(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;

    const admin = await this.adminService.findAdminByRefresh(refresh_token);

    if (!admin) {
      throw new BadGatewayException("Token yoq yoki noto'g'ri");
    }
    admin.refresh_token = '';
    await this.adminService.update(admin.id, admin);

    res.clearCookie('refresh_token');

    return { message: "Siz endi yo'q siz !?" };
  }

  async refreshToken(adminId: number, refresh_token: string, res: Response) {
    const decodeToken = await this.jwtService.decode(refresh_token);

    if (adminId !== decodeToken['id']) {
      throw new ForbiddenException('Ruxsat etilmagan');
    }
    const admin = await this.adminService.findOne(adminId);

    // console.log('Hashed token:', staff?.hashed_refresh_token);

    if (!admin || !admin.refresh_token) {
      throw new NotFoundException('Admin not found');
    }

    const tokenMatch = await bcrypt.compare(refresh_token, admin.refresh_token);

    if (!tokenMatch) {
      throw new ForbiddenException('Forbidden');
    }
    const { accessToken, refreshToken } = await this.AdmingenerateToken(admin);

    const hashed_refresh_token = await bcrypt.hash(refreshToken, 7);
    await this.adminService.updateRefreshToken(admin.id, hashed_refresh_token);

    res.cookie('refresh_token', refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    const respnose = {
      message: 'Admin refreshed',
      patientId: admin.id,
      access_token: accessToken,
    };
    return respnose;
  }
}
