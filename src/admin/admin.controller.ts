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
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity'; // Agar Admin entity mavjud bo'lsa
import { AuthGuard } from '../common/guard/auth.guard';
import { SupperAdminGuard } from '../common/guard/supperAmin.guard';
import { AdminGuard } from '../common/guard/admin.guard';

@ApiBearerAuth()
@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @UseGuards(AuthGuard, SupperAdminGuard)
  @Post()
  @ApiOperation({ summary: 'Yangi admin yaratish' })
  @ApiBody({ type: CreateAdminDto })
  @ApiResponse({
    status: 201,
    description: 'Admin muvaffaqiyatli yaratildi.',
    type: Admin,
  })
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(AuthGuard, SupperAdminGuard)
  @Get()
  @ApiOperation({ summary: 'Barcha adminlarni olish' })
  @ApiResponse({ status: 200, description: "Adminlar ro'yxati", type: [Admin] })
  findAll() {
    return this.adminService.findAll();
  }

  @Get('activate/:link')
  async activateAdmin(@Param('link') link: string) {
    const admin = await this.adminService.findAdminByActivationLink(link);

    if (!admin) {
      throw new NotFoundException('Aktivatsiya linki notogri!');
    }

    admin.is_active = 'true';
    admin.active_link = '';
    await this.adminService.update(admin.id, admin);

    return { message: 'Profil muvaffaqiyatli faollashtirildi!' };
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha adminni olish" })
  @ApiParam({ name: 'id', description: 'Admin ID', type: Number })
  @ApiResponse({ status: 200, description: 'Admin topildi', type: Admin })
  @ApiResponse({ status: 404, description: 'Admin topilmadi' })
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @UseGuards(AuthGuard, AdminGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Adminni yangilash' })
  @ApiParam({
    name: 'id',
    description: 'Yangilanadigan admin ID',
    type: Number,
  })
  @ApiBody({ type: UpdateAdminDto })
  @ApiResponse({ status: 200, description: 'Admin yangilandi', type: Admin })
  @ApiResponse({ status: 404, description: 'Admin topilmadi' })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @UseGuards(AuthGuard, SupperAdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: "Adminni o'chirish" })
  @ApiParam({
    name: 'id',
    description: "O'chiriladigan admin ID",
    type: Number,
  })
  @ApiResponse({ status: 200, description: "Admin o'chirildi" })
  @ApiResponse({ status: 404, description: 'Admin topilmadi' })
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
