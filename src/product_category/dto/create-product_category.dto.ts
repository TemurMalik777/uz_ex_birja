import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, MinLength } from 'class-validator';

export class CreateProductCategoryDto {
  @ApiProperty({ example: 'Electronics', description: 'Category name' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 10, description: 'Related product parameter ID' })
  @IsInt()
  @IsPositive()
  product_param_id: number;
}
