import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductBidsService } from './product_bids.service';
import { CreateProductBidDto } from './dto/create-product_bid.dto';
import { UpdateProductBidDto } from './dto/update-product_bid.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBasicAuth,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ProductBid } from './entities/product_bid.entity'; // bo‘lsa

@ApiBearerAuth('access-token')
@ApiTags('Mahsulot Takliflari') // Swaggerdagi kategoriya nomi
@Controller('product-bids')
export class ProductBidsController {
  constructor(private readonly productBidsService: ProductBidsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi mahsulot taklifi yaratish' })
  @ApiResponse({ status: 201, description: 'Taklif yaratildi', type: ProductBid })
  @ApiResponse({ status: 400, description: 'Noto‘g‘ri maʼlumot' })
  create(@Body() createProductBidDto: CreateProductBidDto) {
    return this.productBidsService.create(createProductBidDto);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha mahsulot takliflarini olish' })
  @ApiResponse({ status: 200, description: 'Takliflar ro‘yxati', type: [ProductBid] })
  findAll() {
    return this.productBidsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha mahsulot taklifini olish' })
  @ApiParam({ name: 'id', type: Number, description: 'Taklif ID raqami' })
  @ApiResponse({ status: 200, description: 'Taklif topildi', type: ProductBid })
  @ApiResponse({ status: 404, description: 'Taklif topilmadi' })
  findOne(@Param('id') id: string) {
    return this.productBidsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mahsulot taklifini yangilash' })
  @ApiParam({ name: 'id', type: Number, description: 'Taklif ID raqami' })
  @ApiResponse({ status: 200, description: 'Taklif yangilandi', type: ProductBid })
  @ApiResponse({ status: 404, description: 'Taklif topilmadi' })
  update(
    @Param('id') id: string,
    @Body() updateProductBidDto: UpdateProductBidDto,
  ) {
    return this.productBidsService.update(+id, updateProductBidDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Mahsulot taklifini o‘chirish' })
  @ApiParam({ name: 'id', type: Number, description: 'Taklif ID raqami' })
  @ApiResponse({ status: 200, description: 'Taklif o‘chirildi' })
  @ApiResponse({ status: 404, description: 'Taklif topilmadi' })
  remove(@Param('id') id: string) {
    return this.productBidsService.remove(+id);
  }
}
