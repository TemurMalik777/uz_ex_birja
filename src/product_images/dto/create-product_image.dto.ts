import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsUrl } from 'class-validator';

export class CreateProductImageDto {
  @ApiProperty({ example: 5, description: 'Tegishli product ID raqami' })
  @IsInt()
  @IsPositive()
  product_id: number;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Rasim URL manzili',
  })
  @IsUrl()
  image_url: string;
}
