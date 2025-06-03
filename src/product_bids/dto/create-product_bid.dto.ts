import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductBidDto {
  @ApiProperty({ example: 1, description: 'Mahsulot ID raqami' })
  @IsNumber()
  product_id: number;

  @ApiProperty({ example: 2, description: 'Yetkazib beruvchi (user) ID raqami' })
  @IsNumber()
  supplier_id: number;

  @ApiProperty({ example: 150000, description: 'Taklif narxi' })
  @IsNumber()
  @IsPositive()
  bid_price: number;
}
