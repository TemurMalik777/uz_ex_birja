import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HoldingsService } from './holdings.service';
import { CreateHoldingDto } from './dto/create-holding.dto';
import { UpdateHoldingDto } from './dto/update-holding.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Holding } from './entities/holding.entity';


@ApiBearerAuth('access-token')
@ApiTags('Holdings')
@Controller('holdings')
export class HoldingsController {
  constructor(private readonly holdingsService: HoldingsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi holding qo‘shish' })
  @ApiBody({ type: CreateHoldingDto })
  @ApiResponse({ status: 201, description: 'Holding muvaffaqiyatli yaratildi', type: Holding })
  create(@Body() createHoldingDto: CreateHoldingDto) {
    return this.holdingsService.create(createHoldingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha holdinglarni olish' })
  @ApiResponse({ status: 200, description: 'Holdinglar ro‘yxati', type: [Holding] })
  findAll() {
    return this.holdingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha holdingni olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Holding ID' })
  @ApiResponse({ status: 200, description: 'Holding topildi', type: Holding })
  @ApiResponse({ status: 404, description: 'Holding topilmadi' })
  findOne(@Param('id') id: string) {
    return this.holdingsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'ID bo‘yicha holdingni yangilash' })
  @ApiParam({ name: 'id', type: Number, description: 'Yangilanadigan holding ID' })
  @ApiBody({ type: UpdateHoldingDto })
  @ApiResponse({ status: 200, description: 'Holding yangilandi', type: Holding })
  @ApiResponse({ status: 404, description: 'Holding topilmadi' })
  update(@Param('id') id: string, @Body() updateHoldingDto: UpdateHoldingDto) {
    return this.holdingsService.update(+id, updateHoldingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'ID bo‘yicha holdingni o‘chirish' })
  @ApiParam({ name: 'id', type: Number, description: 'O‘chiriladigan holding ID' })
  @ApiResponse({ status: 200, description: 'Holding o‘chirildi' })
  @ApiResponse({ status: 404, description: 'Holding topilmadi' })
  remove(@Param('id') id: string) {
    return this.holdingsService.remove(+id);
  }
}
