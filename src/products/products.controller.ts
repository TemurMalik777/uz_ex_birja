import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Product } from './entities/product.entity'; // bo‘lsa

@ApiTags('Mahsulotlar')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi mahsulot qo‘shish' })
  @ApiResponse({ status: 201, description: 'Mahsulot yaratildi', type: Product })
  @ApiResponse({ status: 400, description: 'Noto‘g‘ri maʼlumot' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha mahsulotlarni olish' })
  @ApiResponse({ status: 200, description: 'Mahsulotlar ro‘yxati', type: [Product] })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha mahsulotni olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Mahsulot ID raqami' })
  @ApiResponse({ status: 200, description: 'Mahsulot topildi', type: Product })
  @ApiResponse({ status: 404, description: 'Mahsulot topilmadi' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mahsulotni yangilash' })
  @ApiParam({ name: 'id', type: Number, description: 'Mahsulot ID raqami' })
  @ApiResponse({ status: 200, description: 'Mahsulot yangilandi', type: Product })
  @ApiResponse({ status: 404, description: 'Mahsulot topilmadi' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Mahsulotni o‘chirish' })
  @ApiParam({ name: 'id', type: Number, description: 'Mahsulot ID raqami' })
  @ApiResponse({ status: 200, description: 'Mahsulot o‘chirildi' })
  @ApiResponse({ status: 404, description: 'Mahsulot topilmadi' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
