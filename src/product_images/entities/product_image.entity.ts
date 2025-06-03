import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, IsUrl } from 'class-validator';
import { Product } from '../../products/entities/product.entity';
import { ProductsParam } from '../../products_param/entities/products_param.entity';

@Entity('product_images')
export class ProductImage {
  @ApiProperty({ example: 1, description: 'Product rasimlar id si' })
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ProductsParam,
    (productimage_id) => productimage_id.productimagees,
  )
  @ApiProperty({ example: 5, description: 'Tegishli product ID raqami' })
  @IsInt()
  @IsPositive()
  @Column()
  productimage_id: number;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Rasim URL manzili',
  })
  @IsString()
  @IsUrl()
  @Column()
  image_url: string;
}
