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
import { UpdateAdminPasswordDto } from './dto/update-password.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private readonly adminRepo: Repository<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password, email, ...otherDto } = createAdminDto;

    if (password !== confirm_password) {
      throw new BadRequestException('Password does not match!');
    }

    const existingAdmin = await this.adminRepo.findOne({ where: { email } });
    if (existingAdmin) {
      throw new BadRequestException('Bunday email allaqachon mavjud!');
    }

    const hashed_password = await bcrypt.hash(password, 7);

    const newAdmin = await this.adminRepo.save({
      ...otherDto,
      email,
      hashed_password,
      refresh_token: '',
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

  async findAdminByActivationLink(link: string) {
    return await this.adminRepo.findOne({ where: { active_link: link } });
  }

  findOne(id: number) {
    return this.adminRepo.findOne({ where: { id } });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const adminUpdate = await this.adminRepo.preload({ id, ...updateAdminDto });
    if (!adminUpdate) {
      throw new NotFoundException(`Admin with id ${id} not found`);
    }
    return this.adminRepo.save(adminUpdate);
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
      const match = await bcrypt.compare(
        refresh_token,
        admin.refresh_token || '',
      );
      if (match) return admin;
    }

    return null;
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    await this.adminRepo.update(id, { refresh_token });
    return { message: 'Refresh token updated successfully' };
  }

  // async findAdminByActivationLink(link: string): Promise<User | null> {
  //   return await this.userRepo.findOne({ where: { active_link: link } });
  // }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link jo‘natilmadi!');
    }

    const admin = await this.adminRepo.findOne({
      where: { active_link: link },
    });

    if (!admin) {
      throw new NotFoundException('Aktivatsiya linki notogri!');
    }

    if (admin.is_active) {
      throw new BadRequestException('Allaqachon faollashtirilgan');
    }

    admin.is_active = 'true';
    admin.active_link = ''; // linkni bekor qilish

    await this.adminRepo.save(admin);

    return {
      message: 'Profil muvaffaqiyatli faollashtirildi',
      is_active: admin.is_active,
    };
  }

  async updatePassword(
    id: number,
    dto: UpdateAdminPasswordDto,
  ): Promise<string> {
    const user = await this.adminRepo.findOne({ where: { id } });

    if (!user) throw new NotFoundException('Foydalanuvchi topilmadi');

    const isMatch = await bcrypt.compare(dto.oldpassword, user.hashed_password);
    if (!isMatch) throw new BadRequestException("Eski parol noto'g'ri");

    if (dto.newpassword !== dto.confirm_password) {
      throw new BadRequestException(
        'Yangi parol va tasdiqlash paroli mos emas',
      );
    }

    const hashedNewPassword = await bcrypt.hash(dto.newpassword, 7);
    user.hashed_password = hashedNewPassword;

    await this.adminRepo.save(user);

    return 'Parol muvaffaqiyatli yangilandi';
  }
}
