import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderLogDto {
  @ApiProperty({ example: 123, description: 'Order ID' })
  @IsInt()
  @IsNotEmpty()
  order_id: number;

  @ApiProperty({ example: 'shipped', description: 'Order status' })
  @IsString()
  @IsNotEmpty()
  status: string;
}
