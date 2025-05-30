import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 101, description: 'ID of the product being ordered' })
  @IsInt()
  @IsNotEmpty()
  product_id: number;

  @ApiProperty({ example: 3, description: 'Quantity of the product ordered' })
  @IsInt()
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({
    example: '15000.00',
    description: 'Total price for the order',
  })
  @IsNumberString()
  @IsNotEmpty()
  total_price: string;

  @ApiProperty({ example: 'pending', description: 'Status of the order' })
  @IsString()
  @IsNotEmpty()
  status: string;
}
