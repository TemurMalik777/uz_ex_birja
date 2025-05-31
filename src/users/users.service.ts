import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, confirm_password, ...otherDto } = createUserDto;

    if (password !== confirm_password) {
      throw new BadRequestException('Parollar mos emas!');
    }

    const hashed_password = await bcrypt.hash(password, 7);

    // 1. Aktivatsiya linki yaratish
    const activationLink = uuidv4();

    // 2. Yangi user yaratish
    const newUserWhitHasPasword = await this.userRepo.save({
      ...otherDto,
      password: hashed_password,
      is_active: false,
      active_link: activationLink,
    });

    // 3. Email yuborish
    try {
      await this.mailService.sendUserMail(newUserWhitHasPasword);
    } catch (error) {
      console.error('Email yuborishda xatolik:', error.message);
      throw new ServiceUnavailableException('Emailga xat yuborishda xatolik');
    }

    return newUserWhitHasPasword;
  }

  findAll() {
    return this.userRepo.find({});
  }

  // findByEmail(email: string) {
  //   return this.userRepo.findOneBy({ email });
  // }

  findOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepo.preload({id, ...updateUserDto});
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  async findByEmail(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    return user;
  }

  async findUserByRefresh(refresh_token: string) {
    const users = await this.userRepo.find();

    for (const user of users) {
      const match = await bcrypt.compare(refresh_token, user.refresh_token);
      if (match) return user;
    }

    return null;
  }

  async updateRefreshToken(id: number, refresh_token: string) {
    await this.userRepo.update(id, { refresh_token });
    return { message: 'Refresh token updated successfully' };
  }

  // users.service.ts

  async findUserByActivationLink(link: string): Promise<User | null> {
    return await this.userRepo.findOne({ where: { active_link: link } });
  }

  async activate(link: string) {
    if (!link) {
      throw new BadRequestException('Activation link jo‘natilmadi!');
    }

    const user = await this.userRepo.findOne({ where: { active_link: link } });

    if (!user) {
      throw new NotFoundException('Aktivatsiya linki noto‘g‘ri!');
    }

    if (user.is_active) {
      throw new BadRequestException('Allaqachon faollashtirilgan');
    }

    user.is_active = true;
    user.active_link = ''; // linkni bekor qilish

    await this.userRepo.save(user);

    return {
      message: 'Profil muvaffaqiyatli faollashtirildi',
      is_active: user.is_active,
    };
  }
}
