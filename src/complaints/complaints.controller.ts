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
  ApiBearerAuth,
} from '@nestjs/swagger';

import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateComplaintDto } from './dto/update-complaint.dto';


@ApiBearerAuth('access-token')
@ApiTags('complaints')
@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi shikoyat yaratish' })
  @ApiBody({ type: CreateComplaintDto })
  @ApiResponse({
    status: 201,
    description: 'Shikoyat muvaffaqiyatli yaratildi.',
  })
  create(@Body() createComplaintDto: CreateComplaintDto) {
    return this.complaintsService.create(createComplaintDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha shikoyatlarni olish' })
  @ApiResponse({ status: 200, description: 'Shikoyatlar ro‘yxati.' })
  findAll() {
    return this.complaintsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha shikoyatni olish' })
  @ApiParam({ name: 'id', description: 'Shikoyat ID' })
  @ApiResponse({ status: 200, description: 'Shikoyat topildi.' })
  @ApiResponse({ status: 404, description: 'Shikoyat topilmadi.' })
  findOne(@Param('id') id: string) {
    return this.complaintsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Shikoyatni yangilash' })
  @ApiParam({ name: 'id', description: 'Yangilanadigan shikoyat ID' })
  @ApiBody({ type: UpdateComplaintDto })
  @ApiResponse({ status: 200, description: 'Shikoyat yangilandi.' })
  @ApiResponse({ status: 404, description: 'Shikoyat topilmadi.' })
  update(
    @Param('id') id: string,
    @Body() updateComplaintDto: UpdateComplaintDto,
  ) {
    return this.complaintsService.update(+id, updateComplaintDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Shikoyatni o‘chirish' })
  @ApiParam({ name: 'id', description: 'O‘chirib tashlanadigan shikoyat ID' })
  @ApiResponse({ status: 200, description: 'Shikoyat o‘chirildi.' })
  @ApiResponse({ status: 404, description: 'Shikoyat topilmadi.' })
  remove(@Param('id') id: string) {
    return this.complaintsService.remove(+id);
  }
}
