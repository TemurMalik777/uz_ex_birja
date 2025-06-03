import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Session } from './entities/session.entity'; // Agar entity mavjud bo‘lsa

@ApiTags('Sessiyalar')
@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi sessiya yaratish' })
  @ApiResponse({ status: 201, description: 'Sessiya yaratildi', type: Session })
  @ApiResponse({ status: 400, description: 'Noto‘g‘ri maʼlumot' })
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha sessiyalarni olish' })
  @ApiResponse({
    status: 200,
    description: 'Sessiyalar ro‘yxati',
    type: [Session],
  })
  findAll() {
    return this.sessionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha sessiyani olish' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Sessiya topildi', type: Session })
  @ApiResponse({ status: 404, description: 'Sessiya topilmadi' })
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Sessiyani yangilash' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Sessiya yangilandi',
    type: Session,
  })
  @ApiResponse({ status: 404, description: 'Sessiya topilmadi' })
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionsService.update(+id, updateSessionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Sessiyani o‘chirish' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Sessiya o‘chirildi' })
  @ApiResponse({ status: 404, description: 'Sessiya topilmadi' })
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(+id);
  }
}
