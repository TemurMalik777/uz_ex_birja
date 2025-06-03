import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductCategoryService } from './product_category.service';
import { CreateProductCategoryDto } from './dto/create-product_category.dto';
import { UpdateProductCategoryDto } from './dto/update-product_category.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { ProductCategory } from './entities/product_category.entity'; // agar mavjud bo‘lsa

@ApiTags('Mahsulot Kategoriyalari')
@Controller('product-category')
export class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi mahsulot kategoriyasi yaratish' })
  @ApiResponse({ status: 201, description: 'Kategoriya yaratildi', type: ProductCategory })
  @ApiResponse({ status: 400, description: 'Noto‘g‘ri maʼlumot' })
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this.productCategoryService.create(createProductCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha mahsulot kategoriyalarini olish' })
  @ApiResponse({ status: 200, description: 'Kategoriyalar ro‘yxati', type: [ProductCategory] })
  findAll() {
    return this.productCategoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha mahsulot kategoriyasini olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Kategoriya ID raqami' })
  @ApiResponse({ status: 200, description: 'Kategoriya topildi', type: ProductCategory })
  @ApiResponse({ status: 404, description: 'Kategoriya topilmadi' })
  findOne(@Param('id') id: string) {
    return this.productCategoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mahsulot kategoriyasini yangilash' })
  @ApiParam({ name: 'id', type: Number, description: 'Kategoriya ID raqami' })
  @ApiResponse({ status: 200, description: 'Kategoriya yangilandi', type: ProductCategory })
  @ApiResponse({ status: 404, description: 'Kategoriya topilmadi' })
  update(@Param('id') id: string, @Body() updateProductCategoryDto: UpdateProductCategoryDto) {
    return this.productCategoryService.update(+id, updateProductCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Mahsulot kategoriyasini o‘chirish' })
  @ApiParam({ name: 'id', type: Number, description: 'Kategoriya ID raqami' })
  @ApiResponse({ status: 200, description: 'Kategoriya o‘chirildi' })
  @ApiResponse({ status: 404, description: 'Kategoriya topilmadi' })
  remove(@Param('id') id: string) {
    return this.productCategoryService.remove(+id);
  }
}
