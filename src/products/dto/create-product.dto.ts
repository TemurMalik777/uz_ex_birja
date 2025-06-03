import { IsInt, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 5, description: 'ID of the supplier' })
  @IsInt()
  @IsNotEmpty()
  supplier_id: number;

  @ApiProperty({ example: 2, description: 'ID of the category' })
  @IsInt()
  @IsNotEmpty()
  category_id: number;

  @ApiProperty({ example: 'PENDING', description: 'Status of the product' })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({ example: 'Image is blurry', description: 'Reason for rejection (optional)' })
  @IsString()
  @IsOptional()
  rejection_reason?: string;
}
