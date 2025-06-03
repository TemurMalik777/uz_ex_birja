import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuditsService } from './audits.service';
import { CreateAuditDto } from './dto/create-audit.dto';
import { UpdateAuditDto } from './dto/update-audit.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Audit } from './entities/audit.entity';

@ApiTags('Auditlar')
@Controller('audits')
export class AuditsController {
  constructor(private readonly auditsService: AuditsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi audit yozuvini yaratish' })
  @ApiResponse({ status: 201, description: 'Audit muvaffaqiyatli yaratildi', type: Audit })
  create(@Body() createAuditDto: CreateAuditDto) {
    return this.auditsService.create(createAuditDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha audit yozuvlarini olish' })
  @ApiResponse({ status: 200, description: 'Auditlar ro‘yxati', type: [Audit] })
  findAll() {
    return this.auditsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Audit yozuvini ID bo‘yicha olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Audit ID raqami' })
  @ApiResponse({ status: 200, description: 'Topilgan audit', type: Audit })
  @ApiResponse({ status: 404, description: 'Audit topilmadi' })
  findOne(@Param('id') id: string) {
    return this.auditsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Audit yozuvini ID bo‘yicha yangilash' })
  @ApiParam({ name: 'id', type: Number, description: 'Audit ID raqami' })
  @ApiResponse({ status: 200, description: 'Audit yangilandi', type: Audit })
  @ApiResponse({ status: 404, description: 'Audit topilmadi' })
  update(@Param('id') id: string, @Body() updateAuditDto: UpdateAuditDto) {
    return this.auditsService.update(+id, updateAuditDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Audit yozuvini ID bo‘yicha o‘chirish' })
  @ApiParam({ name: 'id', type: Number, description: 'Audit ID raqami' })
  @ApiResponse({ status: 200, description: 'Audit o‘chirildi' })
  @ApiResponse({ status: 404, description: 'Audit topilmadi' })
  remove(@Param('id') id: string) {
    return this.auditsService.remove(+id);
  }
}
