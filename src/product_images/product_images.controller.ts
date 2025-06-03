import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductImagesService } from './product_images.service';
import { CreateProductImageDto } from './dto/create-product_image.dto';
import { UpdateProductImageDto } from './dto/update-product_image.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ProductImage } from './entities/product_image.entity'; // bo'lsa

@ApiTags('Mahsulot rasmlari')
@Controller('product-images')
export class ProductImagesController {
  constructor(private readonly productImagesService: ProductImagesService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi mahsulot rasmi qo‘shish' })
  @ApiResponse({ status: 201, description: 'Mahsulot rasmi yaratildi', type: ProductImage })
  @ApiResponse({ status: 400, description: 'Noto‘g‘ri maʼlumot' })
  create(@Body() createProductImageDto: CreateProductImageDto) {
    return this.productImagesService.create(createProductImageDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha mahsulot rasmlarini olish' })
  @ApiResponse({ status: 200, description: 'Mahsulot rasmlari ro‘yxati', type: [ProductImage] })
  findAll() {
    return this.productImagesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha mahsulot rasmni olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Rasm ID raqami' })
  @ApiResponse({ status: 200, description: 'Rasm topildi', type: ProductImage })
  @ApiResponse({ status: 404, description: 'Rasm topilmadi' })
  findOne(@Param('id') id: string) {
    return this.productImagesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mahsulot rasmni yangilash' })
  @ApiParam({ name: 'id', type: Number, description: 'Rasm ID raqami' })
  @ApiResponse({ status: 200, description: 'Rasm yangilandi', type: ProductImage })
  @ApiResponse({ status: 404, description: 'Rasm topilmadi' })
  update(@Param('id') id: string, @Body() updateProductImageDto: UpdateProductImageDto) {
    return this.productImagesService.update(+id, updateProductImageDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Mahsulot rasmni o‘chirish' })
  @ApiParam({ name: 'id', type: Number, description: 'Rasm ID raqami' })
  @ApiResponse({ status: 200, description: 'Rasm o‘chirildi' })
  @ApiResponse({ status: 404, description: 'Rasm topilmadi' })
  remove(@Param('id') id: string) {
    return this.productImagesService.remove(+id);
  }
}
