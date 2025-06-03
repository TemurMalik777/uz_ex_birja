import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBasicAuth,
} from '@nestjs/swagger';
import { Order } from './entities/order.entity'; // agar mavjud bo‘lsa

@ApiBasicAuth()
@ApiTags('Buyurtmalar') // Swagger'dagi kategoriya nomi
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi buyurtma yaratish' })
  @ApiResponse({ status: 201, description: 'Buyurtma yaratildi', type: Order })
  @ApiResponse({ status: 400, description: 'Noto‘g‘ri maʼlumot' })
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha buyurtmalarni olish' })
  @ApiResponse({ status: 200, description: 'Buyurtmalar ro‘yxati', type: [Order] })
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha buyurtma olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Buyurtma ID raqami' })
  @ApiResponse({ status: 200, description: 'Buyurtma topildi', type: Order })
  @ApiResponse({ status: 404, description: 'Buyurtma topilmadi' })
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Buyurtmani yangilash' })
  @ApiParam({ name: 'id', type: Number, description: 'Buyurtma ID raqami' })
  @ApiResponse({ status: 200, description: 'Buyurtma yangilandi', type: Order })
  @ApiResponse({ status: 404, description: 'Buyurtma topilmadi' })
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Buyurtmani o‘chirish' })
  @ApiParam({ name: 'id', type: Number, description: 'Buyurtma ID raqami' })
  @ApiResponse({ status: 200, description: 'Buyurtma o‘chirildi' })
  @ApiResponse({ status: 404, description: 'Buyurtma topilmadi' })
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
