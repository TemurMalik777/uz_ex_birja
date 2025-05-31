import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity'; // Agar Admin entity mavjud bo'lsa

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

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

  @Get()
  @ApiOperation({ summary: 'Barcha adminlarni olish' })
  @ApiResponse({ status: 200, description: "Adminlar ro'yxati", type: [Admin] })
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "ID bo'yicha adminni olish" })
  @ApiParam({ name: 'id', description: 'Admin ID', type: Number })
  @ApiResponse({ status: 200, description: 'Admin topildi', type: Admin })
  @ApiResponse({ status: 404, description: 'Admin topilmadi' })
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

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
