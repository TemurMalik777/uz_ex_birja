import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsParamService } from './products_param.service';
import { CreateProductsParamDto } from './dto/create-products_param.dto';
import { UpdateProductsParamDto } from './dto/update-products_param.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProductsParam } from './entities/products_param.entity'; // agar mavjud bo‘lsa

@ApiBearerAuth('access-token')
@ApiTags('Mahsulot Parametrlari')
@Controller('products-param')
export class ProductsParamController {
  constructor(private readonly productsParamService: ProductsParamService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi mahsulot parametri yaratish' })
  @ApiResponse({ status: 201, description: 'Yaratildi', type: ProductsParam })
  @ApiResponse({ status: 400, description: 'Noto‘g‘ri maʼlumot' })
  create(@Body() createProductsParamDto: CreateProductsParamDto) {
    return this.productsParamService.create(createProductsParamDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha mahsulot parametrlarini olish' })
  @ApiResponse({ status: 200, description: 'Ro‘yxat', type: [ProductsParam] })
  findAll() {
    return this.productsParamService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha mahsulot parametrini olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Parametr ID' })
  @ApiResponse({ status: 200, description: 'Topildi', type: ProductsParam })
  @ApiResponse({ status: 404, description: 'Topilmadi' })
  findOne(@Param('id') id: string) {
    return this.productsParamService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mahsulot parametrini yangilash' })
  @ApiParam({ name: 'id', type: Number, description: 'Parametr ID' })
  @ApiResponse({ status: 200, description: 'Yangilandi', type: ProductsParam })
  @ApiResponse({ status: 404, description: 'Topilmadi' })
  update(
    @Param('id') id: string,
    @Body() updateProductsParamDto: UpdateProductsParamDto,
  ) {
    return this.productsParamService.update(+id, updateProductsParamDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Mahsulot parametrini o‘chirish' })
  @ApiParam({ name: 'id', type: Number, description: 'Parametr ID' })
  @ApiResponse({ status: 200, description: 'O‘chirildi' })
  @ApiResponse({ status: 404, description: 'Topilmadi' })
  remove(@Param('id') id: string) {
    return this.productsParamService.remove(+id);
  }
}
