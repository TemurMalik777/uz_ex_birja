import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateAdminReviewDto } from './dto/create-admin_reviw.dto';
import { AdminReviwsService } from './admin_reviws.service';
import { UpdateAdminReviwDto } from './dto/update-admin_reviw.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('amin-reviws')
export class AdminReviwsController {
  constructor(private readonly aminReviwsService: AdminReviwsService) {}

  @Post()
  @ApiOperation({ summary: 'Admin review yaratish' })
  @ApiResponse({ status: 201, description: 'Review yaratildi' })
  @ApiResponse({ status: 400, description: 'Xatolik yuz berdi' })
  create(@Body() createAminReviwDto: CreateAdminReviewDto) {
    return this.aminReviwsService.create(createAminReviwDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha admin reviewlarni olish' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli' })
  findAll() {
    return this.aminReviwsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID orqali reviewni olish' })
  @ApiResponse({ status: 200, description: 'Topildi' })
  @ApiResponse({ status: 404, description: 'Topilmadi' })
  findOne(@Param('id') id: string) {
    return this.aminReviwsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Reviewni yangilash' })
  @ApiResponse({ status: 200, description: 'Muvaffaqiyatli yangilandi' })
  @ApiResponse({ status: 404, description: 'Topilmadi' })
  update(
    @Param('id') id: string,
    @Body() updateAminReviwDto: UpdateAdminReviwDto,
  ) {
    return this.aminReviwsService.update(+id, updateAminReviwDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Reviewni ochirish' })
  @ApiResponse({ status: 200, description: 'Ochirildi' })
  @ApiResponse({ status: 404, description: 'Topilmadi' })
  remove(@Param('id') id: string) {
    return this.aminReviwsService.remove(+id);
  }
}
