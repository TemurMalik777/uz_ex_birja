import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateHoldingDto {
  @ApiProperty({ example: 123, description: 'Order ID' })
  @IsInt()
  @IsNotEmpty()
  order_id: number;

  @ApiProperty({ example: 456, description: 'Supplier ID' })
  @IsInt()
  @IsNotEmpty()
  supplier_id: number;

  @ApiProperty({ example: '15000', description: 'Amount' })
  @IsString()
  @IsNotEmpty()
  amount: string;

  @ApiProperty({ example: 'pending', description: 'Status of the holding' })
  @IsString()
  @IsNotEmpty()
  status: string;
}
