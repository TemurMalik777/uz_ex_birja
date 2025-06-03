import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { User } from '../users/entities/user.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Wallet } from './entities/wallet.entity'; // Agar mavjud bo‘lsa

@ApiTags('Hamyonlar')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  @ApiOperation({ summary: 'Yangi hamyon yaratish' })
  @ApiResponse({ status: 201, description: 'Hamyon yaratildi', type: Wallet })
  @ApiResponse({ status: 400, description: 'Xato so‘rov' })
  create(@Body() createWalletDto: CreateWalletDto, userId: User) {
    return this.walletsService.create(createWalletDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Barcha hamyonlarni olish' })
  @ApiResponse({ status: 200, description: 'Hamyonlar ro‘yxati', type: [Wallet] })
  findAll() {
    return this.walletsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID bo‘yicha hamyonni olish' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Hamyon topildi', type: Wallet })
  @ApiResponse({ status: 404, description: 'Hamyon topilmadi' })
  findOne(@Param('id') id: number) {
    return this.walletsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Hamyonni yangilash' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Hamyon yangilandi', type: Wallet })
  @ApiResponse({ status: 404, description: 'Hamyon topilmadi' })
  update(@Param('id') id: string, @Body() updateWalletDto: UpdateWalletDto) {
    return this.walletsService.update(+id, updateWalletDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Hamyonni o‘chirish' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Hamyon o‘chirildi' })
  @ApiResponse({ status: 404, description: 'Hamyon topilmadi' })
  remove(@Param('id') id: number) {
    return this.walletsService.remove(id);
  }
}
