import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrderLogsService } from './order_logs.service';
import { CreateOrderLogDto } from './dto/create-order_log.dto';
import { UpdateOrderLogDto } from './dto/update-order_log.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBasicAuth, ApiBearerAuth } from '@nestjs/swagger';
import { OrderLog } from './entities/order_log.entity'; // agar mavjud bo‘lsa


@ApiBearerAuth('access-token')
@ApiBasicAuth()
@ApiTags('Buyurtma loglari') // Swagger tag nomi
@Controller('order-logs')
export class OrderLogsController {
  constructor(private readonly orderLogsService: OrderLogsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi buyurtma logini yaratish' })
  @ApiResponse({ status: 201, description: 'Log yaratildi', type: OrderLog })
  @ApiResponse({ status: 400, description: 'Xatolik yuz berdi' })
  create(@Body() createOrderLogDto: CreateOrderLogDto) {
    return this.orderLogsService.create(createOrderLogDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha buyurtma loglarini olish' })
  @ApiResponse({ status: 200, description: 'Loglar roʻyxati', type: [OrderLog] })
  findAll() {
    return this.orderLogsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID orqali logni olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Log ID raqami' })
  @ApiResponse({ status: 200, description: 'Log topildi', type: OrderLog })
  @ApiResponse({ status: 404, description: 'Log topilmadi' })
  findOne(@Param('id') id: string) {
    return this.orderLogsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Logni yangilash' })
  @ApiParam({ name: 'id', type: Number, description: 'Log ID raqami' })
  @ApiResponse({ status: 200, description: 'Log yangilandi', type: OrderLog })
  @ApiResponse({ status: 404, description: 'Log topilmadi' })
  update(
    @Param('id') id: string,
    @Body() updateOrderLogDto: UpdateOrderLogDto,
  ) {
    return this.orderLogsService.update(+id, updateOrderLogDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Logni o‘chirish' })
  @ApiParam({ name: 'id', type: Number, description: 'Log ID raqami' })
  @ApiResponse({ status: 200, description: 'Log o‘chirildi' })
  @ApiResponse({ status: 404, description: 'Log topilmadi' })
  remove(@Param('id') id: string) {
    return this.orderLogsService.remove(+id);
  }
}
