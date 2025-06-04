import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../common/guard/auth.guard';
import { AdminGuard } from '../common/guard/admin.guard';
import { UserAccessGuard } from '../common/guard/clieant-supplier.guard';

@ApiBearerAuth('access-token')
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi foydalanuvchi yaratish' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Foydalanuvchi muvaffaqiyatli yaratildi.',
  })
  @ApiResponse({ status: 400, description: 'Yaroqsiz so‘rov.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Get()
  @ApiOperation({ summary: 'Barcha foydalanuvchilarni olish' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchilar ro‘yxati.' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('activate/:link')
  @ApiOperation({ summary: 'Foydalanuvchini faollashtirish' })
  @ApiParam({ name: 'link', description: 'Faollashtirish linki' })
  @ApiResponse({
    status: 200,
    description: 'Foydalanuvchi muvaffaqiyatli faollashtirildi.',
  })
  @ApiResponse({ status: 404, description: 'Faollashtirish linki topilmadi.' })
  async activateUser(@Param('link') link: string) {
    const user = await this.usersService.findUserByActivationLink(link);

    if (!user) {
      throw new NotFoundException('Aktivatsiya linki notogri!');
    }

    user.is_active = 'true';
    user.active_link = '';
    await this.usersService.update(user.id, user);

    return { message: 'Profil muvaffaqiyatli faollashtirildi!' };
  }

  @UseGuards(AuthGuard, UserAccessGuard)
  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha foydalanuvchini olish' })
  @ApiParam({ name: 'id', description: 'Foydalanuvchi ID' })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi topildi.' })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard, UserAccessGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Foydalanuvchini yangilash' })
  @ApiParam({ name: 'id', description: 'Yangilanadigan foydalanuvchi ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi yangilandi.' })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard, UserAccessGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Foydalanuvchini o‘chirish' })
  @ApiParam({
    name: 'id',
    description: 'O‘chirib tashlanadigan foydalanuvchi ID',
  })
  @ApiResponse({ status: 200, description: 'Foydalanuvchi o‘chirildi.' })
  @ApiResponse({ status: 404, description: 'Foydalanuvchi topilmadi.' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
