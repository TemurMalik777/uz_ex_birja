import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password, ...otherDto } = createAdminDto;
    if (password !== confirm_password) {
      throw new BadRequestException('Password does not match!');
    }
    const hashed_password = await bcrypt.hash(password, 7);
    const newAdmin = await this.adminRepo.save({
      ...otherDto,
      password: hashed_password,
    });
    return newAdmin;
  }

  findAll() {
    return this.adminRepo.find({});
  }

  async findAdminByEmail(email: string) {
    const admin = await this.adminRepo.findOne({ where: { email } });
    return admin;
  }

  findOne(id: number) {
    return this.adminRepo.findOne({ where: { id } });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return this.adminRepo.update(id, updateAdminDto);
  }

  remove(id: number) {
    return this.adminRepo.delete(id);
  }

  // findByEmail(email: string) {
  //   return this.adminRepo.findOne({ where: { email } });
  // }

  async save(admin: Admin) {
    return this.adminRepo.save(admin);
  }

  
  async findByToken(refreshToken: string) {
    if (!refreshToken) {
      throw new NotFoundException('Refresh Token Not Found!');
    }
    try {
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.REFRESH_TOKEN_KEY,
      }) as { id: number };
      const admin = await this.findOne(decoded.id);
      return admin;
    } catch (error) {
      throw new BadRequestException('Invalid or expired refresh token!');
    }
  }

  async findAdminByRefresh(refresh_token: string) {
    const admins = await this.adminRepo.find();

    for (const admin of admins) {
      const match = await bcrypt.compare(refresh_token, admin.refresh_token);
      if (match) return admin;
    }

    return null;
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    await this.adminRepo.update(id, { refresh_token });
    return { message: 'Refresh token updated successfully' };
  }
}
