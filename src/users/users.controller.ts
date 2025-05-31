import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // @Get('activate/:link')
  // activate(@Param('link') link: string) {
  //   return this.usersService.activate(link);
  // }

  // patients.controller.ts
  @Get('activate/:link')
  async activateUser(@Param('link') link: string) {
    const user = await this.usersService.findUserByActivationLink(link);

    if (!user) {
      throw new NotFoundException('Aktivatsiya linki notogri!');
    }

    user.is_active = true;
    user.active_link = '';
    await this.usersService.update(user.id, user);

    return { message: 'Profil muvaffaqiyatli faollashtirildi!' };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
